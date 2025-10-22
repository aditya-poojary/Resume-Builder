import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/../lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const slot = searchParams.get("slot");

    if (!userId || !slot) {
      return NextResponse.json(
        { error: "Missing userId or slot" },
        { status: 400 }
      );
    }

    // Find user's resume
    const userResume = await prisma.resume.findFirst({
      where: { user_id: userId },
    });

    if (!userResume) {
      return NextResponse.json({ resume: null });
    }

    const slotField = `resume_${slot}` as "resume_1" | "resume_2" | "resume_3";
    const resumeData = (userResume as any)[slotField];

    return NextResponse.json({ resume: resumeData });
  } catch (error) {
    console.error("Error loading resume:", error);
    return NextResponse.json(
      { error: "Failed to load resume", details: String(error) },
      { status: 500 }
    );
  }
}
