import { NextResponse } from "next/server";
import { prisma } from "@/../lib/prisma";

export async function POST(request: Request) {
  try {
    const { id, email, name } = await request.json();

    if (!id || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Use upsert to create or update the user
    const user = await prisma.user.upsert({
      where: { id },
      update: {
        email,
        name: name || email.split("@")[0],
        updated_at: new Date(),
      },
      create: {
        id,
        email,
        name: name || email.split("@")[0],
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
