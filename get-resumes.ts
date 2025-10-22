// get-resumes.ts
import { prisma } from "./lib/prisma";

async function getResumes() {
  const resumes = await prisma.resume.findMany({
    include: {
      versions: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  console.log("\n📋 All Resumes:\n");
  resumes.forEach((resume) => {
    console.log(`Resume ID: ${resume.id}`);
    console.log(`Title: ${resume.title}`);
    console.log(`Created: ${resume.createdAt}`);
    if (resume.versions[0]) {
      console.log(`Latest Version: ${resume.versions[0].id}`);
      console.log(`Slug: ${resume.versions[0].slug || "No share link yet"}`);
    }
    console.log("---");
  });

  await prisma.$disconnect();
}

getResumes();
