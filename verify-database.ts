// verify-database.ts
// Comprehensive database verification script

import { prisma } from "./lib/prisma";

async function verifyDatabase() {
  console.log("\n🔍 PostgreSQL Database Verification\n");
  console.log("=".repeat(60));

  try {
    // Test connection
    console.log("\n1️⃣ Testing database connection...");
    await prisma.$connect();
    console.log("✅ Successfully connected to PostgreSQL");

    // Check Users
    console.log("\n2️⃣ Checking Users table...");
    const users = await prisma.user.findMany();
    console.log(`✅ Found ${users.length} user(s)`);
    users.forEach((user) => {
      console.log(`   - ${user.email} (ID: ${user.id})`);
    });

    // Check Resumes
    console.log("\n3️⃣ Checking Resume table...");
    const resumes = await prisma.resume.findMany({
      include: {
        user: true,
        _count: {
          select: { versions: true },
        },
      },
    });
    console.log(`✅ Found ${resumes.length} resume(s)`);
    resumes.forEach((resume) => {
      console.log(`   - ${resume.title} (ID: ${resume.id})`);
      console.log(`     User: ${resume.user?.email || "Anonymous"}`);
      console.log(`     Versions: ${resume._count.versions}`);
    });

    // Check ResumeVersions
    console.log("\n4️⃣ Checking ResumeVersion table...");
    const versions = await prisma.resumeVersion.findMany({
      include: {
        resume: true,
      },
    });
    console.log(`✅ Found ${versions.length} version(s)`);
    versions.forEach((version) => {
      console.log(`   - Version ${version.id.substring(0, 8)}...`);
      console.log(`     Resume: ${version.resume.title}`);
      console.log(`     Slug: ${version.slug || "No share link"}`);
      console.log(`     Created: ${version.createdAt}`);
    });

    // Test a query
    console.log("\n5️⃣ Testing sample query...");
    const latestResume = await prisma.resume.findFirst({
      include: {
        versions: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    if (latestResume) {
      console.log("✅ Successfully queried latest resume:");
      console.log(`   Title: ${latestResume.title}`);
      console.log(`   Latest Version ID: ${latestResume.versions[0]?.id}`);
    }

    // Summary
    console.log("\n" + "=".repeat(60));
    console.log("📊 Database Summary:");
    console.log("=".repeat(60));
    console.log(`Total Users:          ${users.length}`);
    console.log(`Total Resumes:        ${resumes.length}`);
    console.log(`Total Versions:       ${versions.length}`);
    console.log(
      `Versions with Slugs:  ${versions.filter((v) => v.slug).length}`
    );
    console.log("=".repeat(60));

    console.log("\n✅ PostgreSQL database is working correctly!\n");
  } catch (error) {
    console.error("\n❌ Error verifying database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

verifyDatabase();
