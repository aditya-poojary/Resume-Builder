import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/../lib/prisma";

export async function POST(request: NextRequest) {
  console.log("🟡 [RESUME SAVE] API route called");

  try {
    const body = await request.json();
    const { userId, slot, resumeData } = body;

    console.log("🟡 [RESUME SAVE] Parameters:", {
      userId,
      slot,
      hasResumeData: !!resumeData,
    });

    if (!userId || !slot || !resumeData) {
      console.log("⚠️ [RESUME SAVE] Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Test database connection
    console.log("🟡 [RESUME SAVE] Testing database connection...");
    try {
      await prisma.$connect();
      console.log("✅ [RESUME SAVE] Database connected successfully");
    } catch (dbError) {
      console.error("🔴 [RESUME SAVE] Database connection failed:", dbError);
      return NextResponse.json(
        { error: "Database connection failed", details: String(dbError) },
        { status: 500 }
      );
    }

    // Find or create user's resume record
    console.log("🟡 [RESUME SAVE] Finding existing resume...");
    let userResume = await prisma.resume.findFirst({
      where: { user_id: userId },
    });

    console.log(
      "🟡 [RESUME SAVE] Existing resume:",
      userResume ? "Found" : "Not found"
    );

    const slotField = `resume_${slot}` as "resume_1" | "resume_2" | "resume_3";

    if (userResume) {
      // Update existing resume
      console.log("🟡 [RESUME SAVE] Updating existing resume...");
      userResume = await prisma.resume.update({
        where: { id: userResume.id },
        data: {
          [slotField]: resumeData,
          updated_at: new Date(),
        },
      });
      console.log("✅ [RESUME SAVE] Resume updated successfully");
    } else {
      // Create new resume record
      console.log("🟡 [RESUME SAVE] Creating new resume record...");
      userResume = await prisma.resume.create({
        data: {
          user_id: userId,
          [slotField]: resumeData,
        },
      });
      console.log("✅ [RESUME SAVE] New resume created successfully");
    }

    return NextResponse.json({ success: true, resume: userResume });
  } catch (error: any) {
    console.error("🔴 [RESUME SAVE] Error saving resume:", error);
    console.error("🔴 [RESUME SAVE] Error name:", error?.name);
    console.error("🔴 [RESUME SAVE] Error message:", error?.message);
    console.error("🔴 [RESUME SAVE] Error code:", error?.code);
    console.error("🔴 [RESUME SAVE] Error stack:", error?.stack);

    return NextResponse.json(
      {
        error: "Failed to save resume",
        details: error?.message || String(error),
        errorCode: error?.code,
        errorName: error?.name,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
    console.log("🟡 [RESUME SAVE] Database disconnected");
  }
}
