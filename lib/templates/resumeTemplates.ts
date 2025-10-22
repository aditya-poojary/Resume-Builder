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
        title: "Personal Information",
        content: {
          ops: [
            {
              insert: "JOHN DOE",
              attributes: { bold: true, size: "huge", color: "#2563EB" },
            },
            { insert: "\n" },
            {
              insert: "Senior Software Engineer",
              attributes: { size: "large", color: "#6B7280" },
            },
            { insert: "\n\n" },
          ],
        },
        order: 0,
      },
      contact: {
        title: "Contact",
        content: {
          ops: [
            { insert: "📧 Email: ", attributes: { bold: true } },
            { insert: "johndoe@email.com\n" },
            { insert: "📱 Phone: ", attributes: { bold: true } },
            { insert: "+1 (555) 123-4567\n" },
            { insert: "🌐 Portfolio: ", attributes: { bold: true } },
            { insert: "www.johndoe.com\n" },
            { insert: "💼 LinkedIn: ", attributes: { bold: true } },
            { insert: "linkedin.com/in/johndoe\n" },
          ],
        },
        order: 1,
      },
      summary: {
        title: "Professional Summary",
        content: {
          ops: [
            {
              insert:
                "Experienced software engineer with 5+ years of expertise in full-stack development. Passionate about creating scalable applications and solving complex problems. Proven track record of delivering high-quality solutions in fast-paced environments.\n",
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
              insert: "Senior Software Engineer",
              attributes: { bold: true, size: "large" },
            },
            { insert: "\n" },
            {
              insert: "Tech Corp Inc.",
              attributes: { italic: true, color: "#2563EB" },
            },
            { insert: " | San Francisco, CA\n" },
            {
              insert: "Jan 2022 - Present\n",
              attributes: { color: "#6B7280" },
            },
            { insert: "\n" },
            {
              insert:
                "• Led a team of 5 developers in building a microservices architecture\n",
            },
            {
              insert:
                "• Improved application performance by 40% through optimization\n",
            },
            {
              insert:
                "• Implemented CI/CD pipelines reducing deployment time by 60%\n",
            },
            { insert: "\n" },
            {
              insert: "Software Engineer",
              attributes: { bold: true, size: "large" },
            },
            { insert: "\n" },
            {
              insert: "StartUp Solutions",
              attributes: { italic: true, color: "#2563EB" },
            },
            { insert: " | New York, NY\n" },
            {
              insert: "Mar 2020 - Dec 2021\n",
              attributes: { color: "#6B7280" },
            },
            { insert: "\n" },
            {
              insert:
                "• Developed RESTful APIs serving 100K+ daily active users\n",
            },
            {
              insert:
                "• Collaborated with cross-functional teams on product features\n",
            },
            {
              insert:
                "• Mentored junior developers and conducted code reviews\n",
            },
          ],
        },
        order: 3,
      },
      education: {
        title: "Education",
        content: {
          ops: [
            {
              insert: "Bachelor of Science in Computer Science",
              attributes: { bold: true, size: "large" },
            },
            { insert: "\n" },
            {
              insert: "University of Technology",
              attributes: { italic: true, color: "#2563EB" },
            },
            { insert: " | Boston, MA\n" },
            {
              insert: "2016 - 2020 | GPA: 3.8/4.0\n",
              attributes: { color: "#6B7280" },
            },
          ],
        },
        order: 4,
      },
      skills: {
        title: "Skills & Technologies",
        content: {
          ops: [
            { insert: "Programming Languages:\n", attributes: { bold: true } },
            { insert: "JavaScript, TypeScript, Python, Java, Go\n\n" },
            { insert: "Frontend:\n", attributes: { bold: true } },
            { insert: "React, Next.js, Vue.js, Tailwind CSS, Redux\n\n" },
            { insert: "Backend:\n", attributes: { bold: true } },
            { insert: "Node.js, Express, Django, PostgreSQL, MongoDB\n\n" },
            { insert: "DevOps:\n", attributes: { bold: true } },
            { insert: "Docker, Kubernetes, AWS, CI/CD, Git\n" },
          ],
        },
        order: 5,
      },
    },
  },

  {
    id: 2,
    name: "Creative Designer",
    description: "Vibrant and creative design for designers and artists",
    category: "Creative",
    thumbnail: "/templates/creative-designer.svg",
    colors: {
      primary: "#8B5CF6", // Purple
      secondary: "#A78BFA",
      accent: "#C4B5FD",
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
              insert: "CREATIVE NAME",
              attributes: { bold: true, size: "huge", color: "#8B5CF6" },
            },
            { insert: "\n" },
            {
              insert: "UI/UX Designer & Visual Artist",
              attributes: { size: "large", color: "#6B7280", italic: true },
            },
            { insert: "\n\n" },
          ],
        },
        order: 0,
      },
      contact: {
        title: "Let's Connect",
        content: {
          ops: [
            { insert: "✉️ ", attributes: { color: "#8B5CF6" } },
            { insert: "creative@designer.com\n" },
            { insert: "📞 ", attributes: { color: "#8B5CF6" } },
            { insert: "+1 (555) 987-6543\n" },
            { insert: "🎨 ", attributes: { color: "#8B5CF6" } },
            { insert: "behance.net/creative\n" },
            { insert: "📸 ", attributes: { color: "#8B5CF6" } },
            { insert: "instagram.com/creative\n" },
          ],
        },
        order: 1,
      },
      about: {
        title: "About Me",
        content: {
          ops: [
            {
              insert:
                "Creative and passionate designer with a keen eye for detail and aesthetics. Specialized in creating intuitive user experiences and stunning visual designs. Committed to pushing creative boundaries and delivering exceptional results.\n",
            },
          ],
        },
        order: 2,
      },
      experience: {
        title: "Work Experience",
        content: {
          ops: [
            {
              insert: "Senior UI/UX Designer",
              attributes: { bold: true, size: "large", color: "#8B5CF6" },
            },
            { insert: "\n" },
            { insert: "Design Studio Pro", attributes: { italic: true } },
            { insert: " • Los Angeles, CA\n" },
            { insert: "2022 - Present\n", attributes: { color: "#6B7280" } },
            { insert: "\n" },
            { insert: "🎯 Led design for 15+ successful product launches\n" },
            { insert: "🎯 Created design system used by 50+ team members\n" },
            {
              insert: "🎯 Increased user engagement by 65% through redesign\n",
            },
            { insert: "\n" },
            {
              insert: "UI/UX Designer",
              attributes: { bold: true, size: "large", color: "#8B5CF6" },
            },
            { insert: "\n" },
            { insert: "Creative Agency", attributes: { italic: true } },
            { insert: " • San Diego, CA\n" },
            { insert: "2020 - 2022\n", attributes: { color: "#6B7280" } },
            { insert: "\n" },
            { insert: "🎯 Designed mobile apps with 4.8+ star ratings\n" },
            {
              insert:
                "🎯 Collaborated with clients on brand identity projects\n",
            },
          ],
        },
        order: 3,
      },
      education: {
        title: "Education",
        content: {
          ops: [
            {
              insert: "Bachelor of Fine Arts in Graphic Design",
              attributes: { bold: true, size: "large" },
            },
            { insert: "\n" },
            {
              insert: "Art Institute",
              attributes: { italic: true, color: "#8B5CF6" },
            },
            { insert: " • Los Angeles, CA\n" },
            { insert: "2016 - 2020\n", attributes: { color: "#6B7280" } },
          ],
        },
        order: 4,
      },
      skills: {
        title: "Design Skills",
        content: {
          ops: [
            {
              insert: "Design Tools:\n",
              attributes: { bold: true, color: "#8B5CF6" },
            },
            {
              insert: "Figma • Adobe XD • Sketch • Photoshop • Illustrator\n\n",
            },
            {
              insert: "Specializations:\n",
              attributes: { bold: true, color: "#8B5CF6" },
            },
            {
              insert: "UI Design • UX Research • Prototyping • Wireframing\n\n",
            },
            {
              insert: "Additional:\n",
              attributes: { bold: true, color: "#8B5CF6" },
            },
            { insert: "HTML/CSS • Animation • Branding • Typography\n" },
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
