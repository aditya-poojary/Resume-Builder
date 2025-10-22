import { NextResponse } from "next/server";
import { createClient } from "@/../lib/supabase-server";
import { prisma } from "@/../lib/prisma";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Create or update user in database
    const dbUser = await prisma.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email!,
        name: user.user_metadata?.name || user.email?.split("@")[0] || "User",
        updated_at: new Date(),
      },
      create: {
        id: user.id,
        email: user.email!,
        name: user.user_metadata?.name || user.email?.split("@")[0] || "User",
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "User synced to database",
      user: dbUser,
    });
  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json(
      { error: "Failed to sync user", details: String(error) },
      { status: 500 }
    );
  }
}
