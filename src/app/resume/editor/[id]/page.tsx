"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { supabase } from "@/../lib/supabase";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Dynamically import ReactQuill with all modules
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill-new");
    // Register custom font sizes
    if (typeof window !== "undefined") {
      const Quill = (await import("quill")).default;
      const Size = Quill.import("attributors/style/size") as any;
      Size.whitelist = [
        "8px",
        "9px",
        "10px",
        "11px",
        "12px",
        "14px",
        "16px",
        "18px",
        "20px",
        "24px",
        "28px",
        "32px",
        "36px",
      ];
      Quill.register(Size, true);
    }
    return RQ;
  },
  { ssr: false }
);
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
  const [marginTop, setMarginTop] = useState<number>(20);
  const [marginBottom, setMarginBottom] = useState<number>(20);
  const [marginLeft, setMarginLeft] = useState<number>(15);
  const [marginRight, setMarginRight] = useState<number>(15);
  const saveTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);

  // Callback ref to get Quill instance
  const setQuillRef = (ref: any) => {
    if (ref) {
      quillRef.current = ref;
    }
  };

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

      // A4 dimensions in mm
      const a4WidthMm = 210;
      const a4HeightMm = 297;
      const pxPerMm = 96 / 25.4; // ≈3.7795 px/mm

      // Capture the entire editor container
      const canvas = await html2canvas(editorRef.current, {
        scale: 2.5,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      // Calculate actual content dimensions
      const capturedHeightPx = canvas.height / 2.5; // Actual pixel height (unscaled)
      const capturedWidthPx = canvas.width / 2.5; // Actual pixel width (unscaled)
      const contentHeightMm = capturedHeightPx / pxPerMm;
      const contentWidthMm = capturedWidthPx / pxPerMm;

      console.log(
        `📏 Content: ${contentWidthMm.toFixed(2)}mm × ${contentHeightMm.toFixed(
          2
        )}mm`
      );
      console.log(`📄 A4 Page: ${a4WidthMm}mm × ${a4HeightMm}mm`);

      // Create PDF (always single page)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);

      // Calculate if we need to scale down to fit on one page
      let finalWidth = contentWidthMm;
      let finalHeight = contentHeightMm;

      if (contentHeightMm > a4HeightMm || contentWidthMm > a4WidthMm) {
        // Content exceeds page - scale down to fit
        const scaleHeight = a4HeightMm / contentHeightMm;
        const scaleWidth = a4WidthMm / contentWidthMm;
        const scale = Math.min(scaleHeight, scaleWidth); // Use smaller scale to fit both dimensions

        finalWidth = contentWidthMm * scale;
        finalHeight = contentHeightMm * scale;

        console.log(
          `⚠️ Content too large! Scaling down by ${(scale * 100).toFixed(1)}%`
        );
        console.log(
          `📐 Final size: ${finalWidth.toFixed(2)}mm × ${finalHeight.toFixed(
            2
          )}mm`
        );
      } else {
        console.log("✅ Content fits perfectly on 1 page");
      }

      // Center the content on the page if it's smaller than A4
      const xOffset = (a4WidthMm - finalWidth) / 2;
      const yOffset = (a4HeightMm - finalHeight) / 2;

      // Add image to PDF (always one page, scaled to fit)
      pdf.addImage(imgData, "JPEG", xOffset, yOffset, finalWidth, finalHeight);

      const fileName = `Resume_Professional_${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;
      pdf.save(fileName);

      alert("✅ Resume downloaded successfully as a single-page PDF!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Rich text editor modules with custom toolbar
  const modules = {
    toolbar: {
      container: "#toolbar",
    },
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
        <div className="max-w-7xl mx-auto">
          {/* Custom Toolbar - Microsoft Word Style */}
          <div className="mb-6 bg-white rounded-lg shadow-lg overflow-hidden sticky top-20 z-50">
            <div
              id="toolbar"
              className="ql-toolbar-custom p-3 flex justify-center"
            >
              <span className="ql-formats">
                <select className="ql-header" defaultValue="">
                  <option value="1">Heading 1</option>
                  <option value="2">Heading 2</option>
                  <option value="3">Heading 3</option>
                  <option value="4">Heading 4</option>
                  <option value="5">Heading 5</option>
                  <option value="6">Heading 6</option>
                  <option value="">Normal</option>
                </select>
              </span>
              <span className="ql-formats">
                <select className="ql-font"></select>
              </span>
              <span className="ql-formats">
                <button className="ql-bold"></button>
                <button className="ql-italic"></button>
                <button className="ql-underline"></button>
                <button className="ql-strike"></button>
              </span>
              <span className="ql-formats">
                <select className="ql-color"></select>
                <select className="ql-background"></select>
              </span>
              <span className="ql-formats">
                <button className="ql-script" value="sub"></button>
                <button className="ql-script" value="super"></button>
              </span>
              <span className="ql-formats">
                <button className="ql-list" value="ordered"></button>
                <button className="ql-list" value="bullet"></button>
              </span>
              <span className="ql-formats">
                <button className="ql-indent" value="-1"></button>
                <button className="ql-indent" value="+1"></button>
              </span>
              <span className="ql-formats">
                <select className="ql-align"></select>
              </span>
              <span className="ql-formats">
                <button className="ql-blockquote"></button>
                <button className="ql-code-block"></button>
              </span>
              <span className="ql-formats">
                <button className="ql-link"></button>
                <button className="ql-image"></button>
                <button className="ql-video"></button>
              </span>
              <span className="ql-formats">
                <button className="ql-clean"></button>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Margin Controls Sidebar */}
            <div className="col-span-3 self-start sticky top-20 z-40">
              <div className="bg-white rounded-lg shadow-lg p-5">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📏</span>
                  <span>Page Margins</span>
                </h3>

                {/* Margin Controls */}
                <div className="space-y-4">
                  {/* Top Margin */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Top: {marginTop}mm
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="40"
                      value={marginTop}
                      onChange={(e) => setMarginTop(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                  </div>

                  {/* Bottom Margin */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Bottom: {marginBottom}mm
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="40"
                      value={marginBottom}
                      onChange={(e) => setMarginBottom(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                  </div>

                  {/* Left Margin */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Left: {marginLeft}mm
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      value={marginLeft}
                      onChange={(e) => setMarginLeft(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                  </div>

                  {/* Right Margin */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Right: {marginRight}mm
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      value={marginRight}
                      onChange={(e) => setMarginRight(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                  </div>

                  {/* Reset Button */}
                  <button
                    onClick={() => {
                      setMarginTop(20);
                      setMarginBottom(20);
                      setMarginLeft(15);
                      setMarginRight(15);
                    }}
                    className="w-full mt-3 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-medium transition-colors"
                  >
                    Reset Margins
                  </button>
                </div>

                <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs text-purple-700 leading-relaxed">
                    <strong>💡 Tip:</strong> Adjust margins to control spacing.
                    Changes apply to both editor and PDF export.
                  </p>
                </div>
              </div>
            </div>

            {/* A4 Page Preview Container */}
            <div className="col-span-9">
              <div className="flex justify-center">
                <div
                  ref={editorRef}
                  className="bg-white shadow-2xl"
                  style={{
                    width: "210mm",
                    minHeight: "297mm",
                    padding: `${marginTop}mm ${marginRight}mm ${marginBottom}mm ${marginLeft}mm`,
                    boxSizing: "border-box",
                    fontSize: "16px",
                    lineHeight: "1.6",
                    color: "#333",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}
                >
                  <div
                    ref={(el) => {
                      if (el) {
                        const quillInstance = el.querySelector(".ql-editor");
                        if (quillInstance && !quillRef.current) {
                          quillRef.current = el;
                        }
                      }
                    }}
                  >
                    <ReactQuill
                      value={content}
                      onChange={handleContentChange}
                      modules={modules}
                      theme="snow"
                      className="quill-no-toolbar"
                      style={{
                        border: "none",
                        fontSize: "16px",
                        fontFamily: "Arial, Helvetica, sans-serif",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600 max-w-4xl mx-auto">
            <p>
              💡 <strong>Tip:</strong> The editor shows exact A4 page size
              (210mm × 297mm). Use the toolbar above and sidebar to customize!
            </p>
            <p className="mt-2">
              Auto-saves every 2 seconds. Download anytime!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
