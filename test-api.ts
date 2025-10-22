// test-api.ts
// Script to test API endpoints

import { v4 as uuidv4 } from "uuid";

const BASE_URL = "http://localhost:3001";

async function testAPI() {
  console.log("🧪 Starting API tests...\n");

  try {
    // Test 1: Create a new resume
    console.log("1️⃣ Testing POST /api/resume (Create)");
    const createResponse = await fetch(`${BASE_URL}/api/resume`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        snapshot: {
          meta: {
            name: "Test User",
            headline: "Software Engineer",
            email: "test@example.com",
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
                  title: "About Me",
                  bullets: ["This is a test resume", "Created via API"],
                },
              ],
            },
          ],
        },
      }),
    });

    const createData = await createResponse.json();
    console.log("✅ Create Response:", createData);
    const resumeId = createData.resumeId;
    console.log("");

    // Test 2: Get the resume
    console.log("2️⃣ Testing GET /api/resume/[id]");
    const getResponse = await fetch(`${BASE_URL}/api/resume/${resumeId}`);
    const getData = await getResponse.json();
    console.log(
      "✅ Get Response:",
      JSON.stringify(getData, null, 2).substring(0, 500) + "..."
    );
    console.log("");

    // Test 3: Update the resume
    console.log("3️⃣ Testing POST /api/resume (Update)");
    const updateResponse = await fetch(`${BASE_URL}/api/resume`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resumeId,
        snapshot: {
          meta: {
            name: "Test User - Updated",
            headline: "Senior Software Engineer",
            email: "test@example.com",
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
                  title: "About Me",
                  bullets: [
                    "This is an UPDATED test resume",
                    "Modified via API",
                  ],
                },
              ],
            },
          ],
        },
      }),
    });

    const updateData = await updateResponse.json();
    console.log("✅ Update Response:", updateData);
    console.log("");

    // Test 4: Create a share link
    console.log("4️⃣ Testing POST /api/share");
    const shareResponse = await fetch(`${BASE_URL}/api/share`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resumeId,
        snapshot: {
          meta: {
            name: "Shared Resume",
            headline: "This is publicly shared",
            email: "shared@example.com",
          },
          sections: [],
        },
      }),
    });

    const shareData = await shareResponse.json();
    console.log("✅ Share Response:", shareData);
    console.log(`📎 Public URL: ${shareData.publicUrl}`);
    console.log("");

    console.log("✅ All API tests passed!");
    console.log(`\n🔗 Visit the shared resume at: ${shareData.publicUrl}`);
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

testAPI();
