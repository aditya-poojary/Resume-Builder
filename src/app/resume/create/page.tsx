"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { resumeTemplates } from "@/../lib/templates/resumeTemplates";
import { supabase } from "@/../lib/supabase";

export default function ResumeCreatePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<1 | 2 | 3 | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
    setUser(user);
    setLoading(false);
  };

  const handleTemplateSelect = (templateId: 1 | 2 | 3) => {
    if (!selectedSlot) {
      alert("Please select a resume slot first!");
      return;
    }
    router.push(`/resume/edit/${selectedSlot}?template=${templateId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="px-6 py-6 md:px-12 border-b border-blue-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              ResumeBuilder
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Create Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Professional Resume
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Choose a template and start building your future
            </p>
          </div>

          {/* Resume Slot Selection */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Step 1: Select Resume Slot
            </h2>
            <p className="text-gray-600 mb-6">
              You can create up to 3 different resumes. Choose a slot to save
              your work.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {([1, 2, 3] as const).map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    selectedSlot === slot
                      ? "border-blue-600 bg-blue-50 shadow-lg scale-105"
                      : "border-gray-300 hover:border-blue-400 hover:shadow-md"
                  }`}
                >
                  <div className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                        selectedSlot === slot ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`text-2xl font-bold ${
                          selectedSlot === slot ? "text-white" : "text-gray-600"
                        }`}
                      >
                        {slot}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">
                      Resume {slot}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {selectedSlot === slot ? "Selected" : "Click to select"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Template Selection */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Step 2: Choose Your Template
            </h2>
            <p className="text-gray-600 mb-6">
              Select a professional template that matches your style
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {resumeTemplates.map((template) => (
                <div
                  key={template.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-blue-500 cursor-pointer"
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  {/* Template Preview - Realistic Resume Document */}
                  <div className="h-80 p-4 relative overflow-hidden bg-gray-100">
                    {/* Mini Resume Document */}
                    <div className="bg-white h-full rounded shadow-2xl overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-300">
                      {/* Resume Header */}
                      <div
                        className="px-4 py-3 text-center"
                        style={{ backgroundColor: template.colors.primary }}
                      >
                        <div className="text-white font-bold text-sm mb-0.5">
                          JOHN DOE
                        </div>
                        <div className="text-white opacity-90 text-[9px]">
                          john.doe@email.com | (555) 123-4567
                        </div>
                      </div>

                      {/* Resume Content */}
                      <div className="p-3 space-y-2.5">
                        {/* Professional Summary */}
                        <div>
                          <div
                            className="text-[10px] font-bold mb-1 pb-0.5 border-b"
                            style={{
                              color: template.colors.secondary,
                              borderColor: template.colors.accent,
                            }}
                          >
                            PROFESSIONAL SUMMARY
                          </div>
                          <div className="text-[7px] text-gray-600 leading-tight space-y-0.5">
                            <div>
                              Results-driven professional with 5+ years of
                              experience
                            </div>
                            <div>
                              Proven track record in delivering exceptional
                              results
                            </div>
                          </div>
                        </div>

                        {/* Experience */}
                        <div>
                          <div
                            className="text-[10px] font-bold mb-1 pb-0.5 border-b"
                            style={{
                              color: template.colors.secondary,
                              borderColor: template.colors.accent,
                            }}
                          >
                            WORK EXPERIENCE
                          </div>
                          <div className="space-y-1.5">
                            <div>
                              <div className="text-[8px] font-semibold text-gray-800">
                                Senior Developer
                              </div>
                              <div className="text-[7px] text-gray-500 mb-0.5">
                                Tech Company • 2020 - Present
                              </div>
                              <div className="text-[7px] text-gray-600 leading-tight">
                                • Led development of multiple projects
                              </div>
                              <div className="text-[7px] text-gray-600 leading-tight">
                                • Improved system performance by 40%
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Education */}
                        <div>
                          <div
                            className="text-[10px] font-bold mb-1 pb-0.5 border-b"
                            style={{
                              color: template.colors.secondary,
                              borderColor: template.colors.accent,
                            }}
                          >
                            EDUCATION
                          </div>
                          <div className="text-[8px] font-semibold text-gray-800">
                            Bachelor of Science
                          </div>
                          <div className="text-[7px] text-gray-500">
                            University Name • 2016 - 2020
                          </div>
                        </div>

                        {/* Skills */}
                        <div>
                          <div
                            className="text-[10px] font-bold mb-1 pb-0.5 border-b"
                            style={{
                              color: template.colors.secondary,
                              borderColor: template.colors.accent,
                            }}
                          >
                            SKILLS
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {["JavaScript", "React", "Node.js", "Python"].map(
                              (skill, idx) => (
                                <span
                                  key={idx}
                                  className="text-[7px] px-1.5 py-0.5 rounded"
                                  style={{
                                    backgroundColor: `${template.colors.primary}15`,
                                    color: template.colors.secondary,
                                  }}
                                >
                                  {skill}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-14 right-2">
                        <div
                          className="px-2 py-0.5 rounded-full text-[9px] font-semibold shadow-md"
                          style={{
                            backgroundColor: template.colors.accent,
                            color: "white",
                          }}
                        >
                          {template.category}
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
                      <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Use This Template →
                      </button>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {template.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {[
                          template.colors.primary,
                          template.colors.secondary,
                          template.colors.accent,
                        ].map((color, idx) => (
                          <div
                            key={idx}
                            className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        Template {template.id}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              📝 How it works
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Select Slot
                  </h4>
                  <p className="text-sm text-gray-600">
                    Choose which resume slot you want to use (1, 2, or 3)
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Pick Template
                  </h4>
                  <p className="text-sm text-gray-600">
                    Choose a professional template that suits your style
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Edit & Save
                  </h4>
                  <p className="text-sm text-gray-600">
                    Customize your content and save your progress automatically
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
