"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/../lib/supabase";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Template 1: Engineering Executive (Aditya Poojary)
const DEFAULT_TEMPLATE1 = `
<div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333;">
  <!-- Header Section -->
  <div style="text-align: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 3px solid #6b46c1;">
    <h1 style="font-size: 32px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #6b46c1; margin: 0 0 10px 0;">Aditya Poojary</h1>
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

// Template 2: Content Writer (Jonathan Patterson)
const DEFAULT_TEMPLATE2 = `
<div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333;">
  <!-- Header Section -->
  <div style="text-align: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 3px solid #6b46c1;">
    <h1 style="font-size: 32px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #6b46c1; margin: 0 0 10px 0;">Jonathan Patterson</h1>
    <p style="font-size: 11px; color: #555; margin: 5px 0;">
      123 Anywhere St., Any City, ST 12345 | +123-456-7890 | hello@reallygreatsite.com | @reallygreatsite
    </p>
  </div>

  <!-- Professional Summary -->
  <div style="margin-bottom: 20px;">
    <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #6b46c1; border-bottom: 2px solid #6b46c1; padding-bottom: 3px; margin-bottom: 10px;">SUMMARY</h2>
    <p style="font-size: 11px; margin: 0;">
      As a content writer with 3 years of experience, I have a passion for crafting compelling and creative content that engages and informs audiences. My writing style is versatile, with experience across tones from conversational to formal, and I bring strong research, fact-checking, and editing skills to deliver accurate, audience-focused copy on tight deadlines.
    </p>
  </div>

  <!-- Work Experience -->
  <div style="margin-bottom: 20px;">
    <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #6b46c1; border-bottom: 2px solid #6b46c1; padding-bottom: 3px; margin-bottom: 10px;">WORK EXPERIENCE</h2>

    <div style="margin-bottom: 15px;">
      <h3 style="font-size: 12px; font-weight: 700; margin: 0 0 3px 0; color: #000;">Content Writer</h3>
      <p style="font-size: 10px; font-style: italic; color: #666; margin: 0 0 5px 0;">Giggling Platypus Co. | 2019 - Present</p>
      <ul style="margin: 5px 0; padding-left: 20px; font-size: 11px;">
        <li>Write and edit articles, blog posts, and social media updates for a variety of clients in tech, business, and lifestyle niches.</li>
        <li>Conduct research on topics to provide well-informed insights and engaging content.</li>
        <li>Collaborate with clients, editors, and designers to meet objectives and brand voice.</li>
        <li>Utilize SEO techniques and tools to optimize content for search engines and user engagement.</li>
      </ul>
    </div>

    <div style="margin-bottom: 15px;">
      <h3 style="font-size: 12px; font-weight: 700; margin: 0 0 3px 0; color: #000;">Copywriter</h3>
      <p style="font-size: 10px; font-style: italic; color: #666; margin: 0 0 5px 0;">Thynk Unlimited | 2017 - 2019</p>
      <ul style="margin: 5px 0; padding-left: 20px; font-size: 11px;">
        <li>Created and edited marketing copy for print and digital media including brochures, websites, and email campaigns.</li>
        <li>Conducted market research to identify target audiences and develop resonant messaging.</li>
        <li>Proofread and edited copy for accuracy, grammar, and brand consistency.</li>
      </ul>
    </div>

    <div style="margin-bottom: 15px;">
      <h3 style="font-size: 12px; font-weight: 700; margin: 0 0 3px 0; color: #000;">Content Specialist</h3>
      <p style="font-size: 10px; font-style: italic; color: #666; margin: 0 0 5px 0;">Studio Shodwe | 2015 - 2017</p>
      <ul style="margin: 5px 0; padding-left: 20px; font-size: 11px;">
        <li>Created and edited marketing copy for print and digital media, ensuring client requirements were met.</li>
        <li>Conducted market research to define target audiences and messaging strategies.</li>
        <li>Worked closely with clients and account managers to align content with campaign goals.</li>
      </ul>
    </div>
  </div>

  <!-- Education & Certifications -->
  <div style="margin-bottom: 20px;">
    <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #6b46c1; border-bottom: 2px solid #6b46c1; padding-bottom: 3px; margin-bottom: 10px;">EDUCATION &amp; CERTIFICATION</h2>

    <div style="margin-bottom: 10px;">
      <h3 style="font-size: 12px; font-weight: 700; margin: 0 0 3px 0; color: #000;">Bachelor of Arts in English</h3>
      <p style="font-size: 10px; font-style: italic; color: #666; margin: 0;">Ginyard International University | 2019 - 2022</p>
    </div>

    <div style="margin-bottom: 6px;">
      <h3 style="font-size: 12px; font-weight: 700; margin: 0 0 3px 0; color: #000;">Content Marketing Certification</h3>
      <p style="font-size: 10px; font-style: italic; color: #666; margin: 0;">Borcelle Academy | 2019</p>
    </div>

    <div style="margin-top: 6px;">
      <h3 style="font-size: 12px; font-weight: 700; margin: 0 0 3px 0; color: #000;">SEO Fundamentals Certification</h3>
      <p style="font-size: 10px; font-style: italic; color: #666; margin: 0;">Fradel and Spies Academy | 2017</p>
    </div>
  </div>

  <!-- Professional Skills -->
  <div style="margin-bottom: 20px;">
    <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #6b46c1; border-bottom: 2px solid #6b46c1; padding-bottom: 3px; margin-bottom: 10px;">PROFESSIONAL SKILLS</h2>
    <p style="font-size: 11px; margin: 0;"><strong>Technical:</strong> SEO knowledge and related tools, content management systems, proficiency in content strategy and optimization.</p>
    <p style="font-size: 11px; margin: 5px 0 0 0;"><strong>Writing:</strong> Strong writing and editing skills, fact-checking, research, creative copywriting for multiple formats.</p>
    <p style="font-size: 11px; margin: 5px 0 0 0;"><strong>Soft Skills:</strong> Time-management, collaboration with cross-functional teams, creativity and innovation.</p>
  </div>

  <!-- Additional Information -->
  <div style="margin-bottom: 20px;">
    <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #6b46c1; border-bottom: 2px solid #6b46c1; padding-bottom: 3px; margin-bottom: 10px;">ADDITIONAL INFORMATION</h2>
    <p style="font-size: 11px; margin: 0;"><strong>Sample Achievements:</strong> Developed and implemented a content marketing strategy that increased website traffic and engagement; managed a content library ensuring accuracy and consistency.</p>
    <p style="font-size: 11px; margin: 5px 0 0 0;"><strong>Notable Roles:</strong> Produced technical content and user manuals, conducted SME interviews, collaborated with product teams for clear communications.</p>
  </div>
</div>
`;

// Template 3: Web Developer (Eleanor Fitzgerald)
const DEFAULT_TEMPLATE3 = `
<div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333;">
  <!-- Header Section -->
  <div style="text-align: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 3px solid #2b6cb0;">
    <h1 style="font-size: 32px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #2b6cb0; margin: 0 0 10px 0;">
      ELEANOR FITZGERALD
    </h1>
    <p style="font-size: 11px; color: #555; margin: 5px 0;">
      Web Developer • 123 Anywhere St., Any City, ST 12345 | +123-456-7890 | hello@reallygreatsite.com
    </p>
  </div>

  <!-- Professional / Career Summary -->
  <div style="margin-bottom: 20px;">
    <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #2b6cb0; border-bottom: 2px solid #2b6cb0; padding-bottom: 3px; margin-bottom: 10px;">
      CAREER SUMMARY
    </h2>
    <p style="font-size: 11px; margin: 0;">
      Solution-oriented and problem solver with 5 years of experience building and maintaining software and software architecture. Highly skilled in communication, collaboration, and technical documentation.
    </p>
  </div>

  <!-- Work Experience -->
  <div style="margin-bottom: 20px;">
    <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #2b6cb0; border-bottom: 2px solid #2b6cb0; padding-bottom: 3px; margin-bottom: 10px;">
      WORK EXPERIENCE
    </h2>

    <!-- Wardiere Inc. -->
    <div style="margin-bottom: 15px;">
      <h3 style="font-size: 12px; font-weight: 700; margin: 0 0 3px 0; color: #000;">
        Wardiere Inc.
      </h3>
      <p style="font-size: 10px; font-style: italic; color: #666; margin: 0 0 5px 0;">
        Web Developer | 04 February, 2029 - Present
      </p>
      <ul style="margin: 5px 0; padding-left: 20px; font-size: 11px;">
        <li>Ensure user satisfaction and retention by providing responsive tech support.</li>
        <li>Build and maintain software documentation sites using various programming languages.</li>
        <li>Increase productivity by using software to organize, track bug patches and add feature requests.</li>
        <li>Collaborate with other developers to update the website and create new features.</li>
      </ul>
    </div>

    <!-- Paucek and Lage -->
    <div style="margin-bottom: 15px;">
      <h3 style="font-size: 12px; font-weight: 700; margin: 0 0 3px 0; color: #000;">
        Paucek and Lage
      </h3>
      <p style="font-size: 10px; font-style: italic; color: #666; margin: 0 0 5px 0;">
        Junior Web Developer | 05 October, 2026 - 20 December, 2028
      </p>
      <ul style="margin: 5px 0; padding-left: 20px; font-size: 11px;">
        <li>Built and maintained websites for clients through various online platforms.</li>
        <li>Assisted troubleshooting software and created/tested applications for websites.</li>
        <li>Filed reports, gathered information, and performed research.</li>
      </ul>
    </div>

    <!-- Warner & Spencer (project) -->
    <div style="margin-bottom: 15px;">
      <h3 style="font-size: 12px; font-weight: 700; margin: 0 0 3px 0; color: #000;">
        Warner &amp; Spencer (Project)
      </h3>
      <p style="font-size: 10px; font-style: italic; color: #666; margin: 0 0 5px 0;">
        (Date not specified in PDF)
      </p>
      <ul style="margin: 5px 0; padding-left: 20px; font-size: 11px;">
        <li>Built an e-commerce website to showcase the skincare products of Warner &amp; Spencer.</li>
        <li>Integrated an email marketing software to increase subscribers and promote products.</li>
      </ul>
    </div>

    <!-- Timmerman Industries (project) -->
    <div style="margin-bottom: 15px;">
      <h3 style="font-size: 12px; font-weight: 700; margin: 0 0 3px 0; color: #000;">
        Timmerman Industries (Project)
      </h3>
      <p style="font-size: 10px; font-style: italic; color: #666; margin: 0 0 5px 0;">
        (Date not specified in PDF)
      </p>
      <ul style="margin: 5px 0; padding-left: 20px; font-size: 11px;">
        <li>Created a membership site to create, manage, track subscriptions, and sell digital products.</li>
        <li>Made a customizable checkout process to ensure smooth customer purchases.</li>
      </ul>
    </div>

    <!-- Freelance entries -->
    <div style="margin-bottom: 15px;">
      <h3 style="font-size: 12px; font-weight: 700; margin: 0 0 3px 0; color: #000;">
        Freelance Web Developer
      </h3>
      <p style="font-size: 10px; font-style: italic; color: #666; margin: 0 0 5px 0;">
        16 September, 2025 - 17 November, 2025; 13 March, 2024 - 14 May, 2024
      </p>
      <ul style="margin: 5px 0; padding-left: 20px; font-size: 11px;">
        <li>Delivered client websites and small web applications on short timelines.</li>
        <li>Coordinated requirements and implemented features to client specifications.</li>
      </ul>
    </div>
  </div>

  <!-- Education -->
  <div style="margin-bottom: 20px;">
    <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #2b6cb0; border-bottom: 2px solid #2b6cb0; padding-bottom: 3px; margin-bottom: 10px;">
      EDUCATION
    </h2>

    <div style="margin-bottom: 10px;">
      <h3 style="font-size: 12px; font-weight: 700; margin: 0 0 3px 0; color: #000;">
        Bachelor of Computer Science - Software Engineering
      </h3>
      <p style="font-size: 10px; font-style: italic; color: #666; margin: 0;">
        2022 - 2026 | Really Great University
      </p>
      <p style="font-size: 11px; margin: 6px 0 0 0;">
        Relevant coursework: Front-end and back-end web development, Code structure and architecture, Web performance optimization, Programming languages
      </p>
    </div>
  </div>

  <!-- Skills -->
  <div style="margin-bottom: 20px;">
    <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #2b6cb0; border-bottom: 2px solid #2b6cb0; padding-bottom: 3px; margin-bottom: 10px;">
      SKILLS
    </h2>

    <p style="font-size: 11px; margin: 0;"><strong>Technical:</strong> Front-end & back-end web development, web performance optimization, programming languages, code structure & architecture.</p>
    <p style="font-size: 11px; margin: 5px 0 0 0;"><strong>Other:</strong> Documentation, debugging, client communication, project coordination.</p>
  </div>

  <!-- Projects / Extras -->
  <div style="margin-bottom: 20px;">
    <h2 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #2b6cb0; border-bottom: 2px solid #2b6cb0; padding-bottom: 3px; margin-bottom: 10px;">
      RELEVANT PROJECTS
    </h2>
    <p style="font-size: 11px; margin: 0;">
      (Projects listed above under company/project sections: Warner &amp; Spencer — e-commerce, Timmerman Industries — membership & checkout.)
    </p>
  </div>
</div>
`;

export default function VisualResumeEditor() {
  const params = useParams();
  const router = useRouter();
  const slot = parseInt(params?.id as string) as 1 | 2 | 3;

  // Select template based on slot
  const getDefaultTemplate = () => {
    switch (slot) {
      case 1:
        return DEFAULT_TEMPLATE1;
      case 2:
        return DEFAULT_TEMPLATE2;
      case 3:
        return DEFAULT_TEMPLATE3;
      default:
        return DEFAULT_TEMPLATE1;
    }
  };

  const [content, setContent] = useState<string>(getDefaultTemplate());
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
  const contentEditableRef = useRef<HTMLDivElement>(null);

  // Custom toolbar command execution
  const executeCommand = (
    command: string,
    value: string | undefined = undefined
  ) => {
    document.execCommand(command, false, value);
    contentEditableRef.current?.focus();
  };

  // Toolbar button handlers
  const handleBold = () => executeCommand("bold");
  const handleItalic = () => executeCommand("italic");
  const handleUnderline = () => executeCommand("underline");
  const handleStrikeThrough = () => executeCommand("strikeThrough");

  const handleHeading = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      executeCommand("formatBlock", value);
    } else {
      executeCommand("formatBlock", "p");
    }
  };

  const handleFontSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    // Save the current selection
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    // Check if something is selected
    if (!range.collapsed) {
      // Extract the selected content
      const selectedContent = range.extractContents();

      // Create a span with the font size
      const span = document.createElement("span");
      span.style.fontSize = value;
      span.appendChild(selectedContent);

      // Insert the span at the selection
      range.insertNode(span);

      // Restore selection
      range.selectNodeContents(span);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    contentEditableRef.current?.focus();
    handleContentChange();
  };

  const handleFontName = (e: React.ChangeEvent<HTMLSelectElement>) => {
    executeCommand("fontName", e.target.value);
  };

  const handleTextColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    executeCommand("foreColor", e.target.value);
  };

  const handleBackgroundColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    executeCommand("backColor", e.target.value);
  };

  const handleAlign = (align: string) => {
    switch (align) {
      case "left":
        executeCommand("justifyLeft");
        break;
      case "center":
        executeCommand("justifyCenter");
        break;
      case "right":
        executeCommand("justifyRight");
        break;
      case "justify":
        executeCommand("justifyFull");
        break;
    }
  };

  const handleList = (type: "ordered" | "bullet") => {
    if (type === "ordered") {
      executeCommand("insertOrderedList");
    } else {
      executeCommand("insertUnorderedList");
    }
  };

  const handleIndent = (direction: "in" | "out") => {
    if (direction === "in") {
      executeCommand("indent");
    } else {
      executeCommand("outdent");
    }
  };

  const handleLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      executeCommand("createLink", url);
    }
  };

  const handleRemoveFormat = () => {
    executeCommand("removeFormat");
  };

  useEffect(() => {
    initializeEditor();
  }, []);

  // Set initial content when component mounts or content changes from database
  useEffect(() => {
    if (contentEditableRef.current && content) {
      contentEditableRef.current.innerHTML = content;
    }
  }, [loading]); // Only update when loading state changes (after data is fetched)

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
        // Load existing HTML content from database
        console.log(`✅ Loaded existing resume from database for slot ${slot}`);
        setContent(data.resume.htmlContent);
      } else {
        // No data in database - show appropriate default template based on slot
        // User can edit and save it manually
        console.log(
          `ℹ️ No data in database for slot ${slot}, showing default template (not saving yet)`
        );

        // Load the appropriate template for this slot
        setContent(getDefaultTemplate());
      }
    } catch (error) {
      console.error("Error loading resume:", error);
      setContent(getDefaultTemplate());
    }
  };

  const handleContentChange = () => {
    if (contentEditableRef.current) {
      const newContent = contentEditableRef.current.innerHTML;
      setContent(newContent);

      // Debounce auto-save
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
      saveTimerRef.current = setTimeout(() => {
        handleSave(newContent);
      }, 2000); // Auto-save after 2 seconds
    }
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

  // Rich text editor modules with custom toolbar
  const modules = {
    toolbar: "#toolbar",
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
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
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
        </div>
      </header>

      {/* Main Editor */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Custom Toolbar - Simplified */}
          <div className="mb-6 bg-white rounded-lg shadow-lg overflow-visible sticky top-20 z-50">
            <div className="p-3 flex flex-wrap gap-2 items-center justify-center border-b border-gray-200">
              {/* Font Family */}
              <select
                onChange={handleFontName}
                className="px-3 py-1.5 border border-black rounded hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm font-medium text-black bg-white"
                defaultValue="Arial"
              >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
                <option value="Helvetica">Helvetica</option>
              </select>

              <div className="h-6 w-px bg-black"></div>

              {/* Text Formatting */}
              <button
                onClick={handleBold}
                className="px-3 py-1.5 border border-black rounded hover:bg-gray-200 font-bold text-sm text-black"
                title="Bold"
              >
                B
              </button>
              <button
                onClick={handleItalic}
                className="px-3 py-1.5 border border-black rounded hover:bg-gray-200 italic text-sm text-black"
                title="Italic"
              >
                I
              </button>
              <button
                onClick={handleUnderline}
                className="px-3 py-1.5 border border-black rounded hover:bg-gray-200 underline text-sm text-black"
                title="Underline"
              >
                U
              </button>
              <button
                onClick={handleStrikeThrough}
                className="px-3 py-1.5 border border-black rounded hover:bg-gray-200 line-through text-sm text-black"
                title="Strike"
              >
                S
              </button>

              <div className="h-6 w-px bg-black"></div>

              {/* Colors */}
              <input
                type="color"
                onChange={handleTextColor}
                className="w-10 h-8 border-2 border-black rounded cursor-pointer"
                title="Text Color"
              />
              <input
                type="color"
                onChange={handleBackgroundColor}
                className="w-10 h-8 border-2 border-black rounded cursor-pointer"
                title="Background Color"
                defaultValue="#ffffff"
              />

              <div className="h-6 w-px bg-black"></div>

              {/* Alignment */}
              <button
                onClick={() => handleAlign("left")}
                className="px-3 py-1.5 border border-black rounded hover:bg-gray-200 text-sm text-black"
                title="Align Left"
              >
                ☰
              </button>
              <button
                onClick={() => handleAlign("center")}
                className="px-3 py-1.5 border border-black rounded hover:bg-gray-200 text-sm text-black"
                title="Align Center"
              >
                ☷
              </button>
              <button
                onClick={() => handleAlign("right")}
                className="px-3 py-1.5 border border-black rounded hover:bg-gray-200 text-sm text-black"
                title="Align Right"
              >
                ☰
              </button>
              <button
                onClick={() => handleAlign("justify")}
                className="px-3 py-1.5 border border-black rounded hover:bg-gray-200 text-sm text-black"
                title="Justify"
              >
                ≡
              </button>

              <div className="h-6 w-px bg-black"></div>

              {/* Lists */}
              <button
                onClick={() => handleList("ordered")}
                className="px-3 py-1.5 border border-black rounded hover:bg-gray-200 text-sm text-black"
                title="Numbered List"
              >
                1.
              </button>
              <button
                onClick={() => handleList("bullet")}
                className="px-3 py-1.5 border border-black rounded hover:bg-gray-200 text-sm text-black"
                title="Bullet List"
              >
                •
              </button>

              <div className="h-6 w-px bg-black"></div>

              {/* Indent */}
              <button
                onClick={() => handleIndent("out")}
                className="px-3 py-1.5 border border-black rounded hover:bg-gray-200 text-sm text-black"
                title="Decrease Indent"
              >
                ⇤
              </button>
              <button
                onClick={() => handleIndent("in")}
                className="px-3 py-1.5 border border-black rounded hover:bg-gray-200 text-sm text-black"
                title="Increase Indent"
              >
                ⇥
              </button>

              <div className="h-6 w-px bg-black"></div>

              {/* Link */}
              <button
                onClick={handleLink}
                className="px-3 py-1.5 border border-black rounded hover:bg-gray-200 text-sm text-black"
                title="Insert Link"
              >
                🔗
              </button>

              {/* Clear Formatting */}
              <button
                onClick={handleRemoveFormat}
                className="px-3 py-1.5 border border-black rounded hover:bg-gray-200 text-sm text-black"
                title="Remove Formatting"
              >
                ✕
              </button>
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
                    ref={contentEditableRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleContentChange}
                    className="custom-editor"
                    style={{
                      outline: "none",
                      minHeight: "100%",
                      fontSize: "16px",
                      fontFamily: "Arial, Helvetica, sans-serif",
                      lineHeight: "1.6",
                      color: "#333",
                      padding: "0",
                    }}
                  />
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
