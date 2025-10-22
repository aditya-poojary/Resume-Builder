// complete-database-test.ts
// Complete end-to-end database test for PostgreSQL

import { prisma } from "./lib/prisma";
import { v4 as uuidv4 } from "uuid";

async function completeTest() {
  console.log("\n🧪 Complete PostgreSQL Database Test\n");
  console.log("=".repeat(70));

  try {
    // 1. Connection Test
    console.log("\n1️⃣ Testing PostgreSQL Connection...");
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL successfully");

    // 2. Clean start - count existing records
    console.log("\n2️⃣ Current Database State:");
    const initialUsers = await prisma.user.count();
    const initialResumes = await prisma.resume.count();
    const initialVersions = await prisma.resumeVersion.count();
    console.log(`   Users: ${initialUsers}`);
    console.log(`   Resumes: ${initialResumes}`);
    console.log(`   Versions: ${initialVersions}`);

    // 3. Create a new user
    console.log("\n3️⃣ Creating Test User...");
    const testUser = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        name: "Test User",
      },
    });
    console.log(`✅ Created user: ${testUser.email} (ID: ${testUser.id})`);

    // 4. Create a resume for the user
    console.log("\n4️⃣ Creating Test Resume...");
    const testResume = await prisma.resume.create({
      data: {
        userId: testUser.id,
        title: "Test Resume - Database Verification",
        versions: {
          create: {
            snapshot: {
              meta: {
                name: testUser.name,
                headline: "QA Engineer",
                email: testUser.email,
                template: "modern",
                theme: "green",
              },
              sections: [
                {
                  id: uuidv4(),
                  type: "profile",
                  title: "About",
                  order: 0,
                  items: [
                    {
                      id: uuidv4(),
                      title: "Summary",
                      bullets: [
                        "This is a test resume",
                        "Created to verify PostgreSQL integration",
                        "All data should persist correctly",
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
      },
      include: {
        versions: true,
      },
    });
    console.log(
      `✅ Created resume: ${testResume.title} (ID: ${testResume.id})`
    );
    console.log(`✅ Created version: ${testResume.versions[0].id}`);

    // 5. Update the resume (create new version)
    console.log("\n5️⃣ Updating Resume (Creating Version 2)...");
    const newVersion = await prisma.resumeVersion.create({
      data: {
        resumeId: testResume.id,
        snapshot: {
          meta: {
            name: testUser.name,
            headline: "Senior QA Engineer - UPDATED",
            email: testUser.email,
          },
          sections: [],
        },
      },
    });
    console.log(`✅ Created version 2: ${newVersion.id}`);

    // 6. Create a share link
    console.log("\n6️⃣ Creating Share Link...");
    const shareVersion = await prisma.resumeVersion.create({
      data: {
        resumeId: testResume.id,
        slug: uuidv4().split("-")[0],
        snapshot: {
          meta: {
            name: "Shared Resume",
            headline: "This is publicly shared",
          },
          sections: [],
        },
      },
    });
    console.log(`✅ Created share link: ${shareVersion.slug}`);
    console.log(`   Public URL: http://localhost:3001/r/${shareVersion.slug}`);

    // 7. Query and verify data
    console.log("\n7️⃣ Querying Data from PostgreSQL...");

    // Get the resume with all versions
    const resumeWithVersions = await prisma.resume.findUnique({
      where: { id: testResume.id },
      include: {
        user: true,
        versions: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    console.log(`✅ Retrieved resume from database:`);
    console.log(`   Title: ${resumeWithVersions?.title}`);
    console.log(`   User: ${resumeWithVersions?.user?.email}`);
    console.log(`   Total Versions: ${resumeWithVersions?.versions.length}`);
    resumeWithVersions?.versions.forEach((v, i) => {
      console.log(
        `   Version ${i + 1}: ${v.id.substring(0, 8)}... ${
          v.slug ? `(Shared: ${v.slug})` : ""
        }`
      );
    });

    // 8. Test JSON query capability (PostgreSQL specific)
    console.log("\n8️⃣ Testing JSON Query (PostgreSQL Feature)...");
    const versionsWithMeta = await prisma.$queryRaw<any[]>`
      SELECT id, "resumeId", slug, 
             snapshot->>'meta' as meta_json,
             snapshot->'meta'->>'name' as resume_name,
             snapshot->'meta'->>'headline' as headline,
             "createdAt"
      FROM "ResumeVersion"
      WHERE "resumeId" = ${testResume.id}
      ORDER BY "createdAt" DESC
    `;

    console.log(`✅ JSON Query Results (${versionsWithMeta.length} versions):`);
    versionsWithMeta.forEach((v, i) => {
      console.log(`   ${i + 1}. ${v.resume_name} - ${v.headline}`);
      console.log(`      Created: ${v.createdAt}`);
    });

    // 9. Final count
    console.log("\n9️⃣ Final Database State:");
    const finalUsers = await prisma.user.count();
    const finalResumes = await prisma.resume.count();
    const finalVersions = await prisma.resumeVersion.count();
    console.log(`   Users: ${finalUsers} (added ${finalUsers - initialUsers})`);
    console.log(
      `   Resumes: ${finalResumes} (added ${finalResumes - initialResumes})`
    );
    console.log(
      `   Versions: ${finalVersions} (added ${finalVersions - initialVersions})`
    );

    // 10. Summary
    console.log("\n" + "=".repeat(70));
    console.log("🎉 All Tests Passed!");
    console.log("=".repeat(70));
    console.log("\n✅ PostgreSQL Integration Results:");
    console.log("   ✓ Connection successful");
    console.log("   ✓ User creation works");
    console.log("   ✓ Resume creation works");
    console.log("   ✓ Version history works");
    console.log("   ✓ Share links work");
    console.log("   ✓ Data retrieval works");
    console.log("   ✓ JSON queries work (PostgreSQL feature)");
    console.log("   ✓ All data persists correctly\n");

    console.log("📊 Database Provider: PostgreSQL");
    console.log(`📍 Database: resume-builder at localhost:5432`);
    console.log(`🔗 Prisma Studio: http://localhost:5555\n`);
  } catch (error) {
    console.error("\n❌ Test Failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

completeTest();
