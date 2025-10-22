import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/../lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, slot, resumeData } = body;

    if (!userId || !slot || !resumeData) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find or create user's resume record
    let userResume = await prisma.resume.findFirst({
      where: { user_id: userId },
    });

    const slotField = `resume_${slot}` as "resume_1" | "resume_2" | "resume_3";

    if (userResume) {
      // Update existing resume
      userResume = await prisma.resume.update({
        where: { id: userResume.id },
        data: {
          [slotField]: resumeData,
          updated_at: new Date(),
        },
      });
    } else {
      // Create new resume record
      userResume = await prisma.resume.create({
        data: {
          user_id: userId,
          [slotField]: resumeData,
        },
      });
    }

    return NextResponse.json({ success: true, resume: userResume });
  } catch (error) {
    console.error("Error saving resume:", error);
    return NextResponse.json(
      { error: "Failed to save resume", details: String(error) },
      { status: 500 }
    );
  }
}
