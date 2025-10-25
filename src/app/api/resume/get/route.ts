import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/../lib/prisma";

export async function GET(request: NextRequest) {
  console.log("🟢 [RESUME GET] API route called");

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const slot = searchParams.get("slot");

    console.log("🟢 [RESUME GET] Parameters:", { userId, slot });

    if (!userId || !slot) {
      console.log("⚠️ [RESUME GET] Missing parameters");
      return NextResponse.json(
        { error: "Missing userId or slot" },
        { status: 400 }
      );
    }

    // Test database connection
    console.log("🟢 [RESUME GET] Testing database connection...");
    try {
      await prisma.$connect();
      console.log("✅ [RESUME GET] Database connected successfully");
    } catch (dbError) {
      console.error("🔴 [RESUME GET] Database connection failed:", dbError);
      return NextResponse.json(
        { error: "Database connection failed", details: String(dbError) },
        { status: 500 }
      );
    }

    // Find user's resume
    console.log("🟢 [RESUME GET] Querying resume for user:", userId);
    const userResume = await prisma.resume.findFirst({
      where: { user_id: userId },
    });

    console.log(
      "🟢 [RESUME GET] Resume query result:",
      userResume ? "Found" : "Not found"
    );

    if (!userResume) {
      console.log("ℹ️ [RESUME GET] No resume found for user");
      return NextResponse.json({ resume: null });
    }

    const slotField = `resume_${slot}` as "resume_1" | "resume_2" | "resume_3";
    const resumeData = (userResume as any)[slotField];

    console.log("✅ [RESUME GET] Resume data retrieved for slot", slot);

    return NextResponse.json({ resume: resumeData });
  } catch (error: any) {
    console.error("🔴 [RESUME GET] Error loading resume:", error);
    console.error("🔴 [RESUME GET] Error name:", error?.name);
    console.error("🔴 [RESUME GET] Error message:", error?.message);
    console.error("🔴 [RESUME GET] Error code:", error?.code);
    console.error("🔴 [RESUME GET] Error stack:", error?.stack);

    return NextResponse.json(
      {
        error: "Failed to load resume",
        details: error?.message || String(error),
        errorCode: error?.code,
        errorName: error?.name,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
    console.log("🟢 [RESUME GET] Database disconnected");
  }
}
