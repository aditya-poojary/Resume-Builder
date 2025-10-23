"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { supabase } from "@/../lib/supabase";
import { useAppDispatch, useAppSelector } from "@/../lib/redux/hooks";
import {
  setCurrentSlot,
  createNewResume,
  updateSection,
  loadResume,
  setSaving,
  setSaved,
} from "@/../lib/redux/resumeSlice";
import {
  getTemplateById,
  ResumeTemplate,
} from "@/../lib/templates/resumeTemplates";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Dynamically import Quill to avoid SSR issues (using react-quill-new for React 19 compatibility)
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function ResumeEditorPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const slot = parseInt(params.id as string) as 1 | 2 | 3;
  const templateId = searchParams.get("template");

  const [template, setTemplate] = useState<ResumeTemplate | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<any>({});
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const saveTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const resumeRef = useRef<HTMLDivElement>(null);

  const resumeState = useAppSelector((state) => state.resume);
  const currentResume =
    slot === 1
      ? resumeState.resume1
      : slot === 2
      ? resumeState.resume2
      : resumeState.resume3;

  useEffect(() => {
    initializeEditor();
  }, []);

  const initializeEditor = async () => {
    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
    setUser(user);

    // IMPORTANT: Sync user to database first (fixes foreign key constraint)
    try {
      await fetch("/api/user/sync");
    } catch (error) {
      // Silent fail - user sync will be retried on save
    }

    // Set current slot in Redux
    dispatch(setCurrentSlot(slot));

    // Load existing resume from database or create new one
    await loadResumeData(user.id);

    setLoading(false);
  };

  const loadResumeData = async (userId: string) => {
    try {
      // Fetch resume from database
      const response = await fetch(
        `/api/resume/get?userId=${userId}&slot=${slot}`
      );
      const data = await response.json();

      if (data.resume) {
        // Resume exists, load it into Redux
        dispatch(loadResume({ slot, data: data.resume }));
        setSections(data.resume.sections);

        const loadedTemplate = getTemplateById(data.resume.templateId);
        setTemplate(loadedTemplate || null);
      } else {
        // No resume exists, create from template
        if (templateId) {
          const selectedTemplate = getTemplateById(
            parseInt(templateId) as 1 | 2 | 3
          );
          if (selectedTemplate) {
            setTemplate(selectedTemplate);
            const initialSections = selectedTemplate.defaultSections;
            setSections(initialSections);

            // Create new resume in Redux
            dispatch(
              createNewResume({
                slot,
                templateId: selectedTemplate.id,
                sections: initialSections,
              })
            );
          }
        } else {
          router.push("/resume/create");
        }
      }
    } catch (error) {
      console.error("Error loading resume:", error);
    }
  };

  const handleContentChange = (sectionId: string, content: any) => {
    // Update local state
    setSections((prev: any) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        content,
      },
    }));

    // Update Redux
    dispatch(updateSection({ sectionId, content }));

    // Debounce auto-save
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = setTimeout(() => {
      handleSave();
    }, 2000); // Auto-save after 2 seconds of inactivity
  };

  const handleSave = async () => {
    if (!user || !template) {
      return;
    }

    dispatch(setSaving(true));

    try {
      const resumeData = {
        templateId: template.id,
        sections,
        lastModified: new Date().toISOString(),
      };

      const response = await fetch("/api/resume/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          slot,
          resumeData,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        dispatch(setSaved());
      } else {
        alert("Failed to save resume: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("Error saving resume. Please try again.");
    } finally {
      dispatch(setSaving(false));
    }
  };

  const handleDownloadPDF = async () => {
    if (!resumeRef.current || !template || !user) {
      alert("Resume not ready for download. Please try again.");
      return;
    }

    setIsDownloading(true);

    try {
      // Wait a moment for any pending renders
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Get the resume container
      const resumeElement = resumeRef.current;

      // Clone the resume for PDF-specific styling
      const clonedResume = resumeElement.cloneNode(true) as HTMLElement;

      // Apply PDF-specific styles to match the professional resume layout
      clonedResume.style.width = "210mm";
      clonedResume.style.minHeight = "auto";
      clonedResume.style.maxHeight = "none"; // Remove height limit to allow all content
    //   clonedResume.style.padding = "15mm 8mm"; // Reduced left/right margins for more content space
      clonedResume.style.boxShadow = "none";
      clonedResume.style.borderRadius = "0";
      clonedResume.style.overflow = "visible";
      clonedResume.style.fontFamily = "'Arial', 'Helvetica', sans-serif";
      clonedResume.style.backgroundColor = "#ffffff";

      // Remove all Quill toolbars
      const toolbars = clonedResume.querySelectorAll(".ql-toolbar");
      toolbars.forEach((toolbar) => toolbar.remove());

      // Style all section containers for compact, professional look
      const sectionContainers = clonedResume.querySelectorAll("div.p-8");
      sectionContainers.forEach((section, index) => {
        const sectionEl = section as HTMLElement;
        sectionEl.style.padding = "0";
        sectionEl.style.borderTop = "none"; // Remove black separator lines
        sectionEl.style.marginBottom = "6px"; // Further reduced space between sections
        sectionEl.style.pageBreakInside = "avoid";
      });

      // Style section headers to match the professional resume
      const sectionHeaders = clonedResume.querySelectorAll("h2");
      sectionHeaders.forEach((header, index) => {
        const headerEl = header as HTMLElement;

        // First section (Header/Name) - make it special
        if (index === 0) {
          headerEl.style.fontSize = "24px"; // Slightly smaller to save space
          headerEl.style.fontWeight = "700";
          headerEl.style.textAlign = "center";
          headerEl.style.textTransform = "uppercase";
          headerEl.style.letterSpacing = "2px";
          headerEl.style.color = template.colors.primary;
          headerEl.style.marginBottom = "6px"; // Reduced margin
          headerEl.style.marginTop = "0";
          headerEl.style.borderBottom = "none";
          headerEl.style.paddingBottom = "0";
        } else {
          // Other section headers - professional style with underline
          headerEl.style.fontSize = "12px"; // Slightly smaller
          headerEl.style.fontWeight = "700";
          headerEl.style.textTransform = "uppercase";
          headerEl.style.letterSpacing = "1px";
          headerEl.style.color = template.colors.primary;
          headerEl.style.marginBottom = "4px"; // Further reduced margin
          headerEl.style.marginTop = "8px"; // Further reduced margin
          headerEl.style.borderBottom = `2px solid ${template.colors.primary}`;
          headerEl.style.paddingBottom = "2px";
          headerEl.style.textAlign = "left";
        }
      });

      // Style Quill editor content areas
      const editorContents = clonedResume.querySelectorAll(".ql-container");
      editorContents.forEach((content, index) => {
        const contentEl = content as HTMLElement;
        contentEl.style.border = "none";
        contentEl.style.fontFamily = "'Arial', 'Helvetica', sans-serif";

        // First section (Header/Contact) - centered, smaller font
        if (index === 0) {
          contentEl.style.textAlign = "center";
          contentEl.style.fontSize = "9px"; // Smaller font
          contentEl.style.lineHeight = "1.4"; // Tighter line height
          contentEl.style.color = "#333333";
          contentEl.style.marginBottom = "8px"; // Reduced margin
        } else {
          contentEl.style.fontSize = "9px"; // Smaller font for all content
          contentEl.style.lineHeight = "1.4"; // Tighter line height
          contentEl.style.color = "#333333";
        }
      });

      // Style all paragraphs and text
      const allParagraphs = clonedResume.querySelectorAll("p");
      allParagraphs.forEach((p) => {
        const pEl = p as HTMLElement;
        pEl.style.marginBottom = "4px"; // Reduced margin
        pEl.style.marginTop = "0";
        pEl.style.fontSize = "9px"; // Smaller font
        pEl.style.lineHeight = "1.4"; // Tighter line height
        pEl.style.color = "#333333";
        pEl.style.fontFamily = "'Arial', 'Helvetica', sans-serif";
      });

      // Style headings within content (job titles, etc.)
      const h3Elements = clonedResume.querySelectorAll(
        ".ql-editor h3, .ql-editor strong"
      );
      h3Elements.forEach((h3) => {
        const h3El = h3 as HTMLElement;
        h3El.style.fontSize = "10px";
        h3El.style.fontWeight = "700";
        h3El.style.marginBottom = "3px";
        h3El.style.marginTop = "6px";
        h3El.style.color = "#000000";
      });

      // Style lists to match professional resume
      const lists = clonedResume.querySelectorAll("ul, ol");
      lists.forEach((list) => {
        const listEl = list as HTMLElement;
        listEl.style.marginTop = "4px";
        listEl.style.marginBottom = "4px";
        listEl.style.paddingLeft = "18px";
        listEl.style.listStyleType = "disc";
      });

      // Style list items
      const listItems = clonedResume.querySelectorAll("li");
      listItems.forEach((li) => {
        const liEl = li as HTMLElement;
        liEl.style.marginBottom = "2px";
        liEl.style.fontSize = "9px";
        liEl.style.lineHeight = "1.4";
        liEl.style.color = "#333333";
      });

      // Style strong/bold text
      const strongElements = clonedResume.querySelectorAll("strong, b");
      strongElements.forEach((strong) => {
        const strongEl = strong as HTMLElement;
        strongEl.style.fontWeight = "700";
        strongEl.style.color = "#000000";
      });

      // Style links
      const links = clonedResume.querySelectorAll("a");
      links.forEach((link) => {
        const linkEl = link as HTMLElement;
        linkEl.style.color = template.colors.primary;
        linkEl.style.textDecoration = "none";
      });

      // Remove extra spacing from Quill editor wrapper
      const qlEditors = clonedResume.querySelectorAll(".ql-editor");
      qlEditors.forEach((editor) => {
        const editorEl = editor as HTMLElement;
        editorEl.style.padding = "0";
        editorEl.style.fontSize = "9px";
        editorEl.style.lineHeight = "1.4";
      });

      // Append clone to body temporarily (off-screen)
      clonedResume.style.position = "fixed";
      clonedResume.style.left = "-9999px";
      clonedResume.style.top = "0";
      document.body.appendChild(clonedResume);

      // Wait for styles to apply
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Get the actual content height (not limited to A4)
      const actualContentHeight = clonedResume.scrollHeight;
      const contentWidth = 794; // A4 width in pixels at 96 DPI (210mm)

      // Convert the styled clone to canvas with professional settings
      // Use actual content height instead of fixed A4 height
      const canvas = await html2canvas(clonedResume, {
        scale: 3, // High quality output
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: contentWidth,
        height: actualContentHeight, // Use actual height, not fixed 1123px
        windowWidth: contentWidth,
        windowHeight: actualContentHeight, // Use actual height
      });

      // Remove the clone
      document.body.removeChild(clonedResume);

      // Create PDF - professional A4 size
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);

      // Calculate the height in mm based on actual content
      const pxPerMm = 96 / 25.4; // ≈3.7795
      const contentHeightMm = actualContentHeight / pxPerMm;
      const a4HeightMm = 297;

      // If content fits on one page, add it as is
      // If content is taller, scale it down to fit one page
      if (contentHeightMm <= a4HeightMm) {
        // Content fits on one page - add at actual size
        pdf.addImage(imgData, "JPEG", 0, 0, 210, contentHeightMm);
      } else {
        // Content is too tall - scale down to fit one page
        const scaleFactor = a4HeightMm / contentHeightMm;
        const scaledWidth = 210 * scaleFactor;
        const scaledHeight = a4HeightMm;
        const xOffset = (210 - scaledWidth) / 2; // Center horizontally

        pdf.addImage(imgData, "JPEG", xOffset, 0, scaledWidth, scaledHeight);
      }

      // Generate filename
      const fileName = `Resume_${template.name.replace(/\s+/g, "_")}_${
        new Date().toISOString().split("T")[0]
      }.pdf`;

      // Download PDF
      pdf.save(fileName);

      alert("✅ Resume downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your resume...</p>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="text-center">
          <p className="text-red-600 mb-4">Template not found</p>
          <Link
            href="/resume/create"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Templates
          </Link>
        </div>
      </div>
    );
  }

  const sortedSections = Object.entries(sections).sort(
    ([, a]: any, [, b]: any) => a.order - b.order
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="px-6 py-4 border-b border-blue-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link
              href="/resume/create"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">Back</span>
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                {template.name} - Resume {slot}
              </h1>
              <p className="text-xs text-gray-600">
                {resumeState.isSaving ? (
                  <span className="text-yellow-600">Saving...</span>
                ) : resumeState.lastSaved ? (
                  <span className="text-green-600">
                    Saved at{" "}
                    {new Date(resumeState.lastSaved).toLocaleTimeString()}
                  </span>
                ) : (
                  <span>Not saved yet</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={resumeState.isSaving}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Save
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Generating PDF...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download PDF
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Resume Paper */}
          <div
            ref={resumeRef}
            className="bg-white shadow-2xl rounded-lg overflow-hidden"
            style={{
              minHeight: "297mm", // A4 height
            }}
          >
            {sortedSections.map(([sectionId, section]: any, index) => (
              <div
                key={sectionId}
                className={`p-8 ${
                  index !== 0 ? "border-t-2 border-gray-200" : ""
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2
                    className="text-2xl font-bold"
                    style={{ color: template.colors.primary }}
                  >
                    {section.title}
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none">
                  <ReactQuill
                    value={section.content}
                    onChange={(content, delta, source, editor) => {
                      handleContentChange(sectionId, editor.getContents());
                    }}
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ["bold", "italic", "underline"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        [{ color: [] }, { background: [] }],
                        ["link"],
                        ["clean"],
                      ],
                    }}
                    theme="snow"
                    className="min-h-[150px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
