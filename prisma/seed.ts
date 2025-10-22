// prisma/seed.ts
// Seed script to populate database with demo data

import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@local" },
    update: {},
    create: {
      email: "demo@local",
      name: "Demo User",
    },
  });

  console.log("✅ Created/updated user:", user.email);

  // Simple resume snapshot
  const snapshot = {
    id: uuidv4(),
    meta: {
      name: "Demo User",
      headline: "Senior SDE",
      email: "demo@local",
      phone: "+1 234 567 8900",
      location: "Mumbai, India",
      summary:
        "Experienced engineer with expertise in TypeScript, React, and Node.js",
      template: "simple",
      theme: "blue",
      font: "Inter",
    },
    sections: [
      {
        id: uuidv4(),
        type: "profile",
        title: "Profile",
        order: 0,
        items: [
          {
            id: uuidv4(),
            title: "About",
            bullets: [
              "Experienced full-stack engineer",
              "Loves TypeScript and modern web technologies",
              "Passionate about building scalable applications",
            ],
          },
        ],
      },
      {
        id: uuidv4(),
        type: "experience",
        title: "Work Experience",
        order: 1,
        items: [
          {
            id: uuidv4(),
            title: "Senior Software Engineer",
            subtitle: "Tech Company • 2022 - Present",
            bullets: [
              "Built scalable resume builder application",
              "Implemented drag-and-drop functionality",
              "Optimized database queries for better performance",
            ],
          },
          {
            id: uuidv4(),
            title: "Software Engineer",
            subtitle: "Startup Inc • 2020 - 2022",
            bullets: [
              "Developed React-based web applications",
              "Integrated RESTful APIs with frontend",
              "Collaborated with design team on UX improvements",
            ],
          },
        ],
      },
      {
        id: uuidv4(),
        type: "education",
        title: "Education",
        order: 2,
        items: [
          {
            id: uuidv4(),
            title: "B.Tech in Computer Science",
            subtitle: "University Name • 2016 - 2020",
            bullets: ["CGPA: 8.5/10"],
          },
        ],
      },
      {
        id: uuidv4(),
        type: "skills",
        title: "Skills",
        order: 3,
        items: [
          {
            id: uuidv4(),
            bullets: [
              "Languages: TypeScript, JavaScript, Python",
              "Frontend: React, Next.js, Tailwind CSS, Redux",
              "Backend: Node.js, Express, Prisma, PostgreSQL",
              "Tools: Git, Docker, VS Code",
            ],
          },
        ],
      },
    ],
  };

  const resume = await prisma.resume.create({
    data: {
      userId: user.id,
      title: "Demo Resume",
      versions: {
        create: {
          snapshot,
        },
      },
    },
    include: { versions: true },
  });

  console.log("✅ Created demo resume id:", resume.id);
  console.log("✅ Created resume version id:", resume.versions[0].id);
  console.log("\n📝 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
