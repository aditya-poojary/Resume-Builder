export interface ResumeTemplate {
  id: 1 | 2 | 3;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textLight: string;
    background: string;
  };
  defaultSections: {
    [key: string]: {
      title: string;
      content: any; // Quill Delta format
      order: number;
    };
  };
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 1,
    name: "Modern Professional",
    description: "Clean and modern design perfect for tech professionals",
    category: "Professional",
    thumbnail: "/templates/modern-professional.svg",
    colors: {
      primary: "#2563EB", // Blue
      secondary: "#3B82F6",
      accent: "#60A5FA",
      text: "#1F2937",
      textLight: "#6B7280",
      background: "#FFFFFF",
    },
    defaultSections: {
      header: {
        title: "JACQUELINE THOMPSON",
        content: {
          ops: [
            {
              insert:
                "123 Anywhere St., Any City • 123-456-7890 • hello@reallygreatsite.com\nwww.reallygreatsite.com\n",
            },
          ],
        },
        order: 0,
      },
      summary: {
        title: "SUMMARY",
        content: {
          ops: [
            {
              insert:
                "Results-oriented Engineering Executive with a proven track record of optimizing project outcomes. Skilled in strategic project management and team leadership. Seeking a challenging executive role to leverage technical expertise and drive engineering excellence.\n",
            },
          ],
        },
        order: 1,
      },
      experience: {
        title: "WORK EXPERIENCE",
        content: {
          ops: [
            {
              insert: "Engineering Executive, Borcelle Technologies",
              attributes: { bold: true },
            },
            {
              insert:
                "                                                Jan 2023 - Present\n",
            },
            {
              insert:
                "• Implemented cost-effective solutions, resulting in a 20% reduction in project expenses.\n",
            },
            {
              insert:
                "• Streamlined project workflows, enhancing overall efficiency by 25%.\n",
            },
            {
              insert:
                "• Led a team in successfully delivering a complex engineering project on time and within allocated budget.\n\n",
            },
            {
              insert: "Project Engineer, Salford & Co",
              attributes: { bold: true },
            },
            {
              insert:
                "                                                           Mar 2021 - Dec 2022\n",
            },
            {
              insert:
                "• Managed project timelines, reducing delivery times by 30%.\n",
            },
            {
              insert:
                "• Spearheaded the adoption of cutting-edge engineering software, improving project accuracy by 15%.\n",
            },
            {
              insert:
                "• Collaborated with cross-functional teams, enhancing project success rates by 10%.\n\n",
            },
            {
              insert: "Graduate Engineer, Arowwai Industries",
              attributes: { bold: true },
            },
            {
              insert:
                "                                                    Feb 2020 - Jan 2021\n",
            },
            {
              insert:
                "• Coordinated project tasks, ensuring adherence to engineering standards and regulations.\n",
            },
            {
              insert:
                "• Conducted comprehensive project analyses, identifying and rectifying discrepancies in engineering designs.\n",
            },
          ],
        },
        order: 2,
      },
      education: {
        title: "EDUCATION",
        content: {
          ops: [
            {
              insert: "Master of Science in Mechanical Engineering",
              attributes: { bold: true },
            },
            {
              insert:
                "                                               Sep 2019 - Oct 2020\n",
            },
            { insert: "University of Engineering and Technology\n" },
            { insert: "• Specialization in Advanced Manufacturing.\n" },
            {
              insert:
                '• Thesis on "Innovations in Sustainable Engineering Practices".\n\n',
            },
            {
              insert: "Bachelor of Science in Civil Engineering",
              attributes: { bold: true },
            },
            {
              insert:
                "                                                   Aug 2015 - Aug 2019\n",
            },
            { insert: "City College of Engineering\n" },
            {
              insert:
                "• Relevant coursework in Structural Design and Project Management.\n",
            },
          ],
        },
        order: 3,
      },
      additional: {
        title: "ADDITIONAL INFORMATION",
        content: {
          ops: [
            {
              insert: "Technical Skills: ",
              attributes: { bold: true },
            },
            {
              insert:
                "Project Management, Structural Analysis, Robotics and Automation, CAD\n",
            },
            {
              insert: "Languages: ",
              attributes: { bold: true },
            },
            { insert: "English, Malay, German\n" },
            {
              insert: "Certifications: ",
              attributes: { bold: true },
            },
            {
              insert:
                "Professional Engineer (PE) License, Project Management Professional (PMP)\n",
            },
            {
              insert: "Awards/Activities: ",
              attributes: { bold: true },
            },
            {
              insert:
                'Received the "Engineering Excellence" Award for outstanding contributions to project innovation, Borcelle Technologies\n',
            },
          ],
        },
        order: 4,
      },
    },
  },

  {
    id: 2,
    name: "Purple Professional",
    description:
      "Modern purple and white professional resume with elegant design",
    category: "Professional",
    thumbnail: "/templates/purple-professional.svg",
    colors: {
      primary: "#6b46c1", // Purple
      secondary: "#8b5cf6",
      accent: "#c4b5fd",
      text: "#333333",
      textLight: "#555555",
      background: "#FFFFFF",
    },
    defaultSections: {
      header: {
        title: "JACQUELINE THOMPSON",
        content: {
          ops: [
            {
              insert:
                "123 Anywhere St., Any City, ST 12345 | 123-456-7890 | hello@reallygreatsite.com | www.reallygreatsite.com\n",
            },
          ],
        },
        order: 0,
      },
      summary: {
        title: "PROFESSIONAL SUMMARY",
        content: {
          ops: [
            {
              insert:
                "Engineering Executive with extensive experience in strategic planning, team leadership, and project management. Proven track record of delivering complex engineering projects on time and within budget while maintaining the highest quality standards.\n",
            },
          ],
        },
        order: 1,
      },
      experience: {
        title: "WORK EXPERIENCE",
        content: {
          ops: [
            {
              insert: "Engineering Executive",
              attributes: { bold: true },
            },
            { insert: "\n" },
            {
              insert: "Borcelle Technologies | January 2025 - Present",
              attributes: { italic: true },
            },
            { insert: "\n" },
            {
              insert:
                "• Lead cross-functional engineering teams of 50+ professionals across multiple projects\n",
            },
            {
              insert:
                "• Develop and implement strategic engineering initiatives resulting in 30% efficiency improvement\n",
            },
            {
              insert:
                "• Oversee $10M+ annual engineering budget and resource allocation\n\n",
            },
            {
              insert: "Senior Engineering Manager",
              attributes: { bold: true },
            },
            { insert: "\n" },
            {
              insert: "Salford & Co | June 2020 - December 2024",
              attributes: { italic: true },
            },
            { insert: "\n" },
            {
              insert:
                "• Managed engineering department with 25 team members delivering critical infrastructure projects\n",
            },
            {
              insert:
                "• Implemented agile methodologies increasing project delivery speed by 40%\n",
            },
            {
              insert:
                "• Reduced operational costs by 25% through process optimization\n\n",
            },
            {
              insert: "Engineering Team Lead",
              attributes: { bold: true },
            },
            { insert: "\n" },
            {
              insert: "Arowwai Industries | March 2015 - May 2020",
              attributes: { italic: true },
            },
            { insert: "\n" },
            {
              insert:
                "• Led team of 10 engineers in designing and implementing automated systems\n",
            },
            {
              insert:
                "• Achieved 99.5% project success rate with zero safety incidents\n",
            },
            {
              insert:
                "• Mentored junior engineers and established training programs\n",
            },
          ],
        },
        order: 2,
      },
      education: {
        title: "EDUCATION",
        content: {
          ops: [
            {
              insert: "Master of Science in Mechanical Engineering",
              attributes: { bold: true },
            },
            { insert: "\n" },
            {
              insert: "Stanford University | 2013 - 2015",
              attributes: { italic: true },
            },
            { insert: "\n\n" },
            {
              insert: "Bachelor of Science in Civil Engineering",
              attributes: { bold: true },
            },
            { insert: "\n" },
            {
              insert: "University of California, Berkeley | 2009 - 2013",
              attributes: { italic: true },
            },
            { insert: "\n" },
          ],
        },
        order: 3,
      },
      skills: {
        title: "SKILLS & TECHNOLOGIES",
        content: {
          ops: [
            {
              insert: "Technical: ",
              attributes: { bold: true },
            },
            {
              insert:
                "AutoCAD, SolidWorks, MATLAB, Python, Project Management Software, Six Sigma, Lean Manufacturing\n",
            },
            {
              insert: "Leadership: ",
              attributes: { bold: true },
            },
            {
              insert:
                "Strategic Planning, Team Building, Budget Management, Stakeholder Communication, Risk Management\n",
            },
          ],
        },
        order: 4,
      },
      additional: {
        title: "ADDITIONAL INFORMATION",
        content: {
          ops: [
            {
              insert: "Languages: ",
              attributes: { bold: true },
            },
            {
              insert:
                "English (Native), Spanish (Fluent), Mandarin (Conversational)\n",
            },
            {
              insert: "Certifications: ",
              attributes: { bold: true },
            },
            {
              insert:
                "PMP, Six Sigma Black Belt, Professional Engineer (PE) License\n",
            },
            {
              insert: "Awards: ",
              attributes: { bold: true },
            },
            {
              insert:
                "Engineering Excellence Award 2023, Innovation Leader of the Year 2021\n",
            },
          ],
        },
        order: 5,
      },
    },
  },

  {
    id: 3,
    name: "Executive Classic",
    description: "Elegant and professional design for executives and managers",
    category: "Executive",
    thumbnail: "/templates/executive-classic.svg",
    colors: {
      primary: "#059669", // Green
      secondary: "#10B981",
      accent: "#34D399",
      text: "#1F2937",
      textLight: "#6B7280",
      background: "#FFFFFF",
    },
    defaultSections: {
      header: {
        title: "Personal Information",
        content: {
          ops: [
            {
              insert: "EXECUTIVE NAME",
              attributes: { bold: true, size: "huge", color: "#059669" },
            },
            { insert: "\n" },
            {
              insert: "Chief Technology Officer",
              attributes: { size: "large", color: "#6B7280" },
            },
            { insert: "\n\n" },
          ],
        },
        order: 0,
      },
      contact: {
        title: "Contact Information",
        content: {
          ops: [
            { insert: "Email: ", attributes: { bold: true } },
            { insert: "executive@company.com\n" },
            { insert: "Phone: ", attributes: { bold: true } },
            { insert: "+1 (555) 234-5678\n" },
            { insert: "Location: ", attributes: { bold: true } },
            { insert: "New York, NY\n" },
            { insert: "LinkedIn: ", attributes: { bold: true } },
            { insert: "linkedin.com/in/executive\n" },
          ],
        },
        order: 1,
      },
      summary: {
        title: "Executive Summary",
        content: {
          ops: [
            {
              insert:
                "Strategic technology leader with 15+ years of experience driving digital transformation and innovation. Proven track record of building high-performing teams, delivering enterprise solutions, and aligning technology initiatives with business objectives to achieve measurable results.\n",
            },
          ],
        },
        order: 2,
      },
      experience: {
        title: "Professional Experience",
        content: {
          ops: [
            {
              insert: "Chief Technology Officer",
              attributes: { bold: true, size: "large" },
            },
            { insert: "\n" },
            {
              insert: "Global Tech Corporation",
              attributes: { italic: true, color: "#059669" },
            },
            { insert: " | New York, NY\n" },
            { insert: "2020 - Present\n", attributes: { color: "#6B7280" } },
            { insert: "\n" },
            {
              insert:
                "• Lead technology strategy for $500M+ revenue organization\n",
            },
            {
              insert: "• Manage 150+ person engineering and IT organization\n",
            },
            {
              insert:
                "• Drove 45% increase in operational efficiency through automation\n",
            },
            { insert: "• Implemented cloud migration saving $3M annually\n" },
            { insert: "\n" },
            {
              insert: "VP of Engineering",
              attributes: { bold: true, size: "large" },
            },
            { insert: "\n" },
            {
              insert: "Enterprise Solutions Inc.",
              attributes: { italic: true, color: "#059669" },
            },
            { insert: " | Boston, MA\n" },
            { insert: "2015 - 2020\n", attributes: { color: "#6B7280" } },
            { insert: "\n" },
            { insert: "• Built engineering team from 20 to 100+ members\n" },
            {
              insert: "• Launched 5 major products generating $50M+ revenue\n",
            },
            {
              insert: "• Established engineering best practices and culture\n",
            },
          ],
        },
        order: 3,
      },
      education: {
        title: "Education & Certifications",
        content: {
          ops: [
            {
              insert: "Master of Business Administration (MBA)",
              attributes: { bold: true, size: "large" },
            },
            { insert: "\n" },
            {
              insert: "Harvard Business School",
              attributes: { italic: true, color: "#059669" },
            },
            { insert: " | Cambridge, MA\n" },
            { insert: "2012 - 2014\n", attributes: { color: "#6B7280" } },
            { insert: "\n" },
            {
              insert: "Bachelor of Science in Computer Engineering",
              attributes: { bold: true, size: "large" },
            },
            { insert: "\n" },
            { insert: "MIT", attributes: { italic: true, color: "#059669" } },
            { insert: " | Cambridge, MA\n" },
            { insert: "2002 - 2006\n", attributes: { color: "#6B7280" } },
          ],
        },
        order: 4,
      },
      expertise: {
        title: "Core Competencies",
        content: {
          ops: [
            { insert: "Leadership: ", attributes: { bold: true } },
            {
              insert:
                "Team Building • Strategic Planning • Change Management\n\n",
            },
            { insert: "Technical: ", attributes: { bold: true } },
            {
              insert:
                "Cloud Architecture • Digital Transformation • Cybersecurity\n\n",
            },
            { insert: "Business: ", attributes: { bold: true } },
            {
              insert:
                "P&L Management • Vendor Relations • Board Presentations\n",
            },
          ],
        },
        order: 5,
      },
    },
  },
];

export function getTemplateById(id: 1 | 2 | 3): ResumeTemplate | undefined {
  return resumeTemplates.find((t) => t.id === id);
}
