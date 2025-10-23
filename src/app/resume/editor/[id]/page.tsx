"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { supabase } from "@/../lib/supabase";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Dynamically import ReactQuill with all modules
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

// Default purple and white professional resume template
const DEFAULT_TEMPLATE = `
<div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333;">
  <!-- Header Section -->
  <div style="text-align: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 3px solid #6b46c1;">
    <h1 style="font-size: 32px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #6b46c1; margin: 0 0 10px 0;">JACQUELINE THOMPSON</h1>
    <p style="font-size: 11px; color: #555; margin: 5px 0;">123 Anywhere St., Any City, ST 12345 | 123-456-7890 | hello@reallygreatsite.com | www.reallygreatsite.com</p>
  </div>

  <!-- Professional Summary -->
  <div style="margin-bottom: 20px;">
    <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #6b46c1; border-bottom: 2px solid #6b46c1; padding-bottom: 3px; margin-bottom: 10px;">PROFESSIONAL SUMMARY</h2>
    <p style="font-size: 11px; margin: 0;">Engineering Executive with extensive experience in strategic planning, team leadership, and project management. Proven track record of delivering complex engineering projects on time and within budget while maintaining the highest quality standards.</p>
  </div>

  <!-- Work Experience -->
  <div style="margin-bottom: 20px;">
    <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #6b46c1; border-bottom: 2px solid #6b46c1; padding-bottom: 3px; margin-bottom: 10px;">WORK EXPERIENCE</h2>
    
    <div style="margin-bottom: 15px;">
      <h3 style="font-size: 12px; font-weight: 700; margin: 0 0 3px 0; color: #000;">Engineering Executive</h3>
      <p style="font-size: 10px; font-style: italic; color: #666; margin: 0 0 5px 0;">Borcelle Technologies | January 2025 - Present</p>
      <ul style="margin: 5px 0; padding-left: 20px; font-size: 11px;">
        <li>Lead cross-functional engineering teams of 50+ professionals across multiple projects</li>
        <li>Develop and implement strategic engineering initiatives resulting in 30% efficiency improvement</li>
        <li>Oversee $10M+ annual engineering budget and resource allocation</li>
      </ul>
    </div>

    <div style="margin-bottom: 15px;">
      <h3 style="font-size: 12px; font-weight: 700; margin: 0 0 3px 0; color: #000;">Senior Engineering Manager</h3>
      <p style="font-size: 10px; font-style: italic; color: #666; margin: 0 0 5px 0;">Salford & Co | June 2020 - December 2024</p>
      <ul style="margin: 5px 0; padding-left: 20px; font-size: 11px;">
        <li>Managed engineering department with 25 team members delivering critical infrastructure projects</li>
        <li>Implemented agile methodologies increasing project delivery speed by 40%</li>
        <li>Reduced operational costs by 25% through process optimization</li>
      </ul>
    </div>

    <div style="margin-bottom: 15px;">
      <h3 style="font-size: 12px; font-weight: 700; margin: 0 0 3px 0; color: #000;">Engineering Team Lead</h3>
      <p style="font-size: 10px; font-style: italic; color: #666; margin: 0 0 5px 0;">Arowwai Industries | March 2015 - May 2020</p>
      <ul style="margin: 5px 0; padding-left: 20px; font-size: 11px;">
        <li>Led team of 10 engineers in designing and implementing automated systems</li>
        <li>Achieved 99.5% project success rate with zero safety incidents</li>
        <li>Mentored junior engineers and established training programs</li>
      </ul>
    </div>
  </div>

  <!-- Education -->
  <div style="margin-bottom: 20px;">
    <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #6b46c1; border-bottom: 2px solid #6b46c1; padding-bottom: 3px; margin-bottom: 10px;">EDUCATION</h2>
    
    <div style="margin-bottom: 10px;">
      <h3 style="font-size: 12px; font-weight: 700; margin: 0 0 3px 0; color: #000;">Master of Science in Mechanical Engineering</h3>
      <p style="font-size: 10px; font-style: italic; color: #666; margin: 0;">Stanford University | 2013 - 2015</p>
    </div>

    <div style="margin-bottom: 10px;">
      <h3 style="font-size: 12px; font-weight: 700; margin: 0 0 3px 0; color: #000;">Bachelor of Science in Civil Engineering</h3>
      <p style="font-size: 10px; font-style: italic; color: #666; margin: 0;">University of California, Berkeley | 2009 - 2013</p>
    </div>
  </div>

  <!-- Skills & Technologies -->
  <div style="margin-bottom: 20px;">
    <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #6b46c1; border-bottom: 2px solid #6b46c1; padding-bottom: 3px; margin-bottom: 10px;">SKILLS & TECHNOLOGIES</h2>
    <p style="font-size: 11px; margin: 0;"><strong>Technical:</strong> AutoCAD, SolidWorks, MATLAB, Python, Project Management Software, Six Sigma, Lean Manufacturing</p>
    <p style="font-size: 11px; margin: 5px 0 0 0;"><strong>Leadership:</strong> Strategic Planning, Team Building, Budget Management, Stakeholder Communication, Risk Management</p>
  </div>

  <!-- Additional Information -->
  <div style="margin-bottom: 20px;">
    <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #6b46c1; border-bottom: 2px solid #6b46c1; padding-bottom: 3px; margin-bottom: 10px;">ADDITIONAL INFORMATION</h2>
    <p style="font-size: 11px; margin: 0;"><strong>Languages:</strong> English (Native), Spanish (Fluent), Mandarin (Conversational)</p>
    <p style="font-size: 11px; margin: 5px 0;"><strong>Certifications:</strong> PMP, Six Sigma Black Belt, Professional Engineer (PE) License</p>
    <p style="font-size: 11px; margin: 5px 0 0 0;"><strong>Awards:</strong> Engineering Excellence Award 2023, Innovation Leader of the Year 2021</p>
  </div>
</div>
`;

export default function VisualResumeEditor() {
  const params = useParams();
  const router = useRouter();
  const slot = parseInt(params?.id as string) as 1 | 2 | 3;

  const [content, setContent] = useState<string>(DEFAULT_TEMPLATE);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const saveTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const editorRef = useRef<HTMLDivElement>(null);

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

    // Sync user to database
    try {
      await fetch("/api/user/sync");
    } catch (error) {
      // Silent fail
    }

    // Load existing resume from database
    await loadResumeData(user.id);

    setLoading(false);
  };

  const loadResumeData = async (userId: string) => {
    try {
      const response = await fetch(
        `/api/resume/get?userId=${userId}&slot=${slot}`
      );
      const data = await response.json();

      if (data.resume && data.resume.htmlContent) {
        // Load existing HTML content
        setContent(data.resume.htmlContent);
      } else {
        // Use default template
        setContent(DEFAULT_TEMPLATE);
      }
    } catch (error) {
      console.error("Error loading resume:", error);
      setContent(DEFAULT_TEMPLATE);
    }
  };

  const handleContentChange = (value: string) => {
    setContent(value);

    // Debounce auto-save
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = setTimeout(() => {
      handleSave(value);
    }, 2000); // Auto-save after 2 seconds
  };

  const handleSave = async (contentToSave?: string) => {
    if (!user) return;

    setIsSaving(true);

    try {
      const resumeData = {
        htmlContent: contentToSave || content,
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

      if (response.ok) {
        setLastSaved(new Date().toLocaleTimeString());
      } else {
        const result = await response.json();
        alert("Failed to save resume: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("Error saving resume. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!editorRef.current || !user) {
      alert("Resume not ready for download. Please try again.");
      return;
    }

    setIsDownloading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Create a clean container for PDF
      const container = document.createElement("div");
      container.innerHTML = content;
      container.style.position = "fixed";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.style.width = "210mm";
      container.style.padding = "15mm 10mm";
      container.style.backgroundColor = "#ffffff";
      container.style.fontFamily = "Arial, Helvetica, sans-serif";

      document.body.appendChild(container);
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Get actual content height
      const actualHeight = container.scrollHeight;
      const contentWidth = 794; // A4 width at 96 DPI

      // Render with html2canvas
      const canvas = await html2canvas(container, {
        scale: 2.5,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: contentWidth,
        height: actualHeight,
        windowWidth: contentWidth,
        windowHeight: actualHeight,
      });

      document.body.removeChild(container);

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pxPerMm = 96 / 25.4;
      const contentHeightMm = actualHeight / pxPerMm;
      const a4HeightMm = 297;

      // Add to PDF (single or multi-page)
      if (contentHeightMm <= a4HeightMm) {
        pdf.addImage(imgData, "JPEG", 0, 0, 210, contentHeightMm);
      } else {
        // Multi-page support
        const scaleFactor = a4HeightMm / contentHeightMm;
        const scaledWidth = 210 * scaleFactor;
        const xOffset = (210 - scaledWidth) / 2;
        pdf.addImage(imgData, "JPEG", xOffset, 0, scaledWidth, a4HeightMm);
      }

      const fileName = `Resume_Professional_${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;
      pdf.save(fileName);

      alert("✅ Resume downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Rich text editor modules with ALL features
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your resume editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Header */}
      <header className="px-6 py-4 border-b border-purple-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
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
                Visual Resume Editor - Slot {slot}
              </h1>
              <p className="text-xs text-gray-600">
                {isSaving ? (
                  <span className="text-yellow-600">Saving...</span>
                ) : lastSaved ? (
                  <span className="text-green-600">Saved at {lastSaved}</span>
                ) : (
                  <span>Not saved yet</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSave()}
              disabled={isSaving}
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
              Save Now
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Generating...
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

      {/* Main Editor */}
      <main className="px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div
            ref={editorRef}
            className="bg-white shadow-2xl rounded-lg overflow-hidden"
            style={{ minHeight: "800px" }}
          >
            <ReactQuill
              value={content}
              onChange={handleContentChange}
              modules={modules}
              theme="snow"
              className="h-full"
              style={{ minHeight: "800px" }}
            />
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              💡 <strong>Tip:</strong> This is a full document editor. Edit
              anywhere in the resume! Auto-saves every 2 seconds.
            </p>
            <p className="mt-2">
              Use the toolbar above to format text, add images, change colors,
              and more.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
