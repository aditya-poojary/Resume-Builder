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

    // IMPORTANT: Sync user to database (fixes foreign key constraint)
    try {
      await fetch("/api/user/sync");
    } catch (error) {
      // Silent fail - user sync will be retried on save
    }

    setLoading(false);
  };

  const handleTemplateSelect = (templateId: 1 | 2 | 3) => {
    // Redirect to new visual editor instead of section-based editor
    router.push(`/resume/editor/${templateId}`);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      // Redirect to home page
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative px-6 py-6 md:px-12">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl blur opacity-75 group-hover:opacity-100 transition"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                ResumeBuilder
              </span>
              <p className="text-xs text-gray-500 font-medium -mt-1">
                Craft Your Future
              </p>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {user.email?.split("@")[0]}
              </span>
            </div>
            <Link
              href="/"
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md hover:shadow-lg flex items-center gap-2 text-sm"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative px-6 md:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold rounded-full shadow-lg">
                ✨ THREE PROFESSIONAL TEMPLATES
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 leading-tight">
              Choose Your
              <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Resume Style
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              Each template is professionally designed and fully customizable.
              Pick the one that best represents you!
            </p>
          </div>

          {/* Templates Grid - More Creative Layout */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {resumeTemplates.map((template, index) => (
              <div
                key={template.id}
                className="group relative"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`,
                }}
              >
                {/* Floating Badge */}
                <div className="absolute -top-3 -right-3 z-20">
                  <div
                    className="px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform"
                    style={{
                      background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
                    }}
                  >
                    #{template.id}
                  </div>
                </div>

                {/* Card */}
                <div
                  onClick={() => handleTemplateSelect(template.id)}
                  className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 border-2 border-transparent hover:border-white"
                  style={{
                    background: `linear-gradient(white, white) padding-box, linear-gradient(135deg, ${template.colors.primary}, ${template.colors.accent}) border-box`,
                  }}
                >
                  {/* Preview Section */}
                  <div className="relative h-96 p-5 overflow-hidden">
                    {/* Background Pattern */}
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: `radial-gradient(circle, ${template.colors.primary} 1px, transparent 1px)`,
                        backgroundSize: "20px 20px",
                      }}
                    ></div>

                    {/* Mini Resume Document */}
                    <div className="relative bg-white h-full rounded-xl shadow-2xl overflow-hidden transform group-hover:scale-[1.03] transition-transform duration-500 border">
                      {/* Template 1: Engineering Executive - Aditya Poojary */}
                      {template.id === 1 && (
                        <>
                          {/* Header */}
                          <div
                            className="px-4 py-4 text-center relative overflow-hidden"
                            style={{
                              background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
                            }}
                          >
                            <div className="absolute inset-0 bg-white opacity-10"></div>
                            <div className="relative text-white font-black text-base tracking-wider mb-1">
                              ADITYA POOJARY
                            </div>
                            <div className="relative text-white/90 text-[9px] font-medium">
                              123 Anywhere St., Any City, ST 12345
                            </div>
                            <div className="relative text-white/80 text-[8px] mt-1">
                              123-456-7890 • hello@reallygreatsite.com
                            </div>
                          </div>

                          {/* Body */}
                          <div className="p-4 space-y-2.5">
                            {/* Professional Summary */}
                            <div>
                              <div
                                className="text-[10px] font-black mb-1 pb-0.5 border-b-2 tracking-wide flex items-center gap-1"
                                style={{
                                  color: template.colors.secondary,
                                  borderColor: template.colors.accent,
                                }}
                              >
                                <div
                                  className="w-1 h-2.5 rounded"
                                  style={{
                                    backgroundColor: template.colors.primary,
                                  }}
                                ></div>
                                PROFESSIONAL SUMMARY
                              </div>
                              <div className="text-[7px] text-gray-700 leading-relaxed">
                                Engineering Executive with extensive experience in strategic planning, team leadership, and project management. Proven track record of delivering complex engineering projects.
                              </div>
                            </div>

                            {/* Work Experience */}
                            <div>
                              <div
                                className="text-[10px] font-black mb-1 pb-0.5 border-b-2 tracking-wide flex items-center gap-1"
                                style={{
                                  color: template.colors.secondary,
                                  borderColor: template.colors.accent,
                                }}
                              >
                                <div
                                  className="w-1 h-2.5 rounded"
                                  style={{
                                    backgroundColor: template.colors.primary,
                                  }}
                                ></div>
                                WORK EXPERIENCE
                              </div>
                              <div className="space-y-1.5">
                                <div>
                                  <div className="flex justify-between items-start mb-0.5">
                                    <div className="text-[8px] font-bold text-gray-900">
                                      Engineering Executive
                                    </div>
                                    <div
                                      className="text-[6px] font-semibold px-1.5 py-0.5 rounded"
                                      style={{
                                        backgroundColor: `${template.colors.primary}15`,
                                        color: template.colors.secondary,
                                      }}
                                    >
                                      Jan 2025-Present
                                    </div>
                                  </div>
                                  <div className="text-[7px] text-gray-600 mb-0.5 italic">
                                    Borcelle Technologies
                                  </div>
                                  <div className="text-[6.5px] text-gray-700 leading-tight space-y-0.5">
                                    <div>• Lead 50+ engineering professionals</div>
                                    <div>• 30% efficiency improvement</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Skills */}
                            <div>
                              <div
                                className="text-[10px] font-black mb-1 pb-0.5 border-b-2 tracking-wide flex items-center gap-1"
                                style={{
                                  color: template.colors.secondary,
                                  borderColor: template.colors.accent,
                                }}
                              >
                                <div
                                  className="w-1 h-2.5 rounded"
                                  style={{
                                    backgroundColor: template.colors.primary,
                                  }}
                                ></div>
                                SKILLS
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {["AutoCAD", "Python", "Six Sigma", "PMP"].map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[7px] px-1.5 py-0.5 rounded-full font-semibold"
                                    style={{
                                      backgroundColor: `${template.colors.primary}20`,
                                      color: template.colors.secondary,
                                    }}
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Template 2: Content Writer - Jonathan Patterson */}
                      {template.id === 2 && (
                        <>
                          {/* Header */}
                          <div
                            className="px-4 py-4 text-center relative overflow-hidden"
                            style={{
                              background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
                            }}
                          >
                            <div className="absolute inset-0 bg-white opacity-10"></div>
                            <div className="relative text-white font-black text-base tracking-wider mb-1">
                              JONATHAN PATTERSON
                            </div>
                            <div className="relative text-white/90 text-[9px] font-medium">
                              123 Anywhere St., Any City, ST 12345
                            </div>
                            <div className="relative text-white/80 text-[8px] mt-1">
                              +123-456-7890 • hello@reallygreatsite.com
                            </div>
                          </div>

                          {/* Body */}
                          <div className="p-4 space-y-2.5">
                            {/* Summary */}
                            <div>
                              <div
                                className="text-[10px] font-black mb-1 pb-0.5 border-b-2 tracking-wide flex items-center gap-1"
                                style={{
                                  color: template.colors.secondary,
                                  borderColor: template.colors.accent,
                                }}
                              >
                                <div
                                  className="w-1 h-2.5 rounded"
                                  style={{
                                    backgroundColor: template.colors.primary,
                                  }}
                                ></div>
                                SUMMARY
                              </div>
                              <div className="text-[7px] text-gray-700 leading-relaxed">
                                Content writer with 3 years of experience crafting compelling and creative content that engages and informs audiences. Versatile writing style with strong research and editing skills.
                              </div>
                            </div>

                            {/* Work Experience */}
                            <div>
                              <div
                                className="text-[10px] font-black mb-1 pb-0.5 border-b-2 tracking-wide flex items-center gap-1"
                                style={{
                                  color: template.colors.secondary,
                                  borderColor: template.colors.accent,
                                }}
                              >
                                <div
                                  className="w-1 h-2.5 rounded"
                                  style={{
                                    backgroundColor: template.colors.primary,
                                  }}
                                ></div>
                                WORK EXPERIENCE
                              </div>
                              <div className="space-y-1.5">
                                <div>
                                  <div className="flex justify-between items-start mb-0.5">
                                    <div className="text-[8px] font-bold text-gray-900">
                                      Content Writer
                                    </div>
                                    <div
                                      className="text-[6px] font-semibold px-1.5 py-0.5 rounded"
                                      style={{
                                        backgroundColor: `${template.colors.primary}15`,
                                        color: template.colors.secondary,
                                      }}
                                    >
                                      2019-Present
                                    </div>
                                  </div>
                                  <div className="text-[7px] text-gray-600 mb-0.5 italic">
                                    Giggling Platypus Co.
                                  </div>
                                  <div className="text-[6.5px] text-gray-700 leading-tight space-y-0.5">
                                    <div>• Write articles & blog posts for tech clients</div>
                                    <div>• Utilize SEO techniques for optimization</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Professional Skills */}
                            <div>
                              <div
                                className="text-[10px] font-black mb-1 pb-0.5 border-b-2 tracking-wide flex items-center gap-1"
                                style={{
                                  color: template.colors.secondary,
                                  borderColor: template.colors.accent,
                                }}
                              >
                                <div
                                  className="w-1 h-2.5 rounded"
                                  style={{
                                    backgroundColor: template.colors.primary,
                                  }}
                                ></div>
                                SKILLS
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {[
                                  "SEO",
                                  "Copywriting",
                                  "Research",
                                  "Editing",
                                ].map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[7px] px-1.5 py-0.5 rounded-full font-semibold"
                                    style={{
                                      backgroundColor: `${template.colors.primary}20`,
                                      color: template.colors.secondary,
                                    }}
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Template 3: Web Developer - Eleanor Fitzgerald */}
                      {template.id === 3 && (
                        <>
                          {/* Header - Different style for Web Developer */}
                          <div
                            className="px-4 py-4 relative border-b-4"
                            style={{ borderColor: template.colors.primary }}
                          >
                            <div className="text-center">
                              <div
                                className="font-black text-base tracking-wider mb-1"
                                style={{ color: template.colors.primary }}
                              >
                                ELEANOR FITZGERALD
                              </div>
                              <div className="text-[9px] font-semibold text-gray-600">
                                Web Developer
                              </div>
                              <div className="text-[7px] text-gray-500 mt-1">
                                123 Anywhere St., Any City, ST 12345
                              </div>
                            </div>
                          </div>

                          {/* Body */}
                          <div className="p-4 space-y-2.5">
                            {/* Career Summary */}
                            <div>
                              <div
                                className="text-[10px] font-black mb-1 pb-0.5 border-b-2 tracking-wide"
                                style={{
                                  color: template.colors.primary,
                                  borderColor: template.colors.accent,
                                }}
                              >
                                CAREER SUMMARY
                              </div>
                              <div className="text-[7px] text-gray-700 leading-relaxed">
                                Solution-oriented problem solver with 5 years of experience building and maintaining software. Highly skilled in communication, collaboration, and technical documentation.
                              </div>
                            </div>

                            {/* Work Experience */}
                            <div>
                              <div
                                className="text-[10px] font-black mb-1 pb-0.5 border-b-2 tracking-wide"
                                style={{
                                  color: template.colors.primary,
                                  borderColor: template.colors.accent,
                                }}
                              >
                                WORK EXPERIENCE
                              </div>
                              <div className="space-y-1.5">
                                <div>
                                  <div className="text-[8px] font-bold text-gray-900 mb-0.5">
                                    Web Developer
                                  </div>
                                  <div
                                    className="text-[7px] font-semibold mb-0.5"
                                    style={{ color: template.colors.primary }}
                                  >
                                    Wardiere Inc.
                                  </div>
                                  <div className="text-[6px] text-gray-600 mb-0.5 italic">
                                    Feb 2029 - Present
                                  </div>
                                  <div className="text-[6.5px] text-gray-700 leading-tight space-y-0.5">
                                    <div>• Build & maintain documentation sites</div>
                                    <div>• Collaborate with developers on features</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Skills */}
                            <div>
                              <div
                                className="text-[10px] font-black mb-1 pb-0.5 border-b-2 tracking-wide"
                                style={{
                                  color: template.colors.primary,
                                  borderColor: template.colors.accent,
                                }}
                              >
                                SKILLS
                              </div>
                              <div className="text-[6.5px] text-gray-700 leading-relaxed">
                                <span className="font-bold">Technical:</span> Front-end & back-end development
                                <br />
                                <span className="font-bold">Other:</span> Documentation • Client communication
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute bottom-5 right-5">
                      <div
                        className="px-3 py-1 rounded-lg text-[10px] font-bold text-white shadow-lg backdrop-blur-sm"
                        style={{
                          backgroundColor: template.colors.accent,
                        }}
                      >
                        {template.category}
                      </div>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-black text-2xl text-gray-900 mb-1">
                          {template.name}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {template.description}
                        </p>
                      </div>
                    </div>

                    {/* Color Palette */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-2">
                        {[
                          template.colors.primary,
                          template.colors.secondary,
                          template.colors.accent,
                        ].map((color, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 rounded-lg shadow-md border-2 border-white transform hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                      <div className="text-xs font-bold text-gray-400">
                        PALETTE
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      className="w-full py-3.5 rounded-xl font-black text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm tracking-wide"
                      style={{
                        background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
                      }}
                    >
                      Start Creating
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl border border-white/50">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-black text-gray-900 mb-3">
                How It Works
              </h3>
              <p className="text-gray-600">
                Simple, powerful, and designed for you
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg group-hover:scale-110 transition-transform">
                  1
                </div>
                <h4 className="font-black text-lg text-gray-900 mb-2">
                  Pick Your Style
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Choose from our three professionally designed templates - each
                  with its own personality
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg group-hover:scale-110 transition-transform">
                  2
                </div>
                <h4 className="font-black text-lg text-gray-900 mb-2">
                  Fill In Your Info
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Use our intuitive editor to add your experience, skills, and
                  achievements
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg group-hover:scale-110 transition-transform">
                  3
                </div>
                <h4 className="font-black text-lg text-gray-900 mb-2">
                  Download & Apply
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Export your polished resume and start landing your dream job
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 font-bold text-sm transform hover:scale-105 transition-all"
        >
          <svg
            className="w-5 h-5"
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
          Back Home
        </Link>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
