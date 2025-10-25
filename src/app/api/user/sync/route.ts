import { NextResponse } from "next/server";
import { createClient } from "@/../lib/supabase-server";
import { prisma } from "@/../lib/prisma";

export async function GET() {
  console.log("🔵 [USER SYNC] API route called");

  try {
    console.log("🔵 [USER SYNC] Creating Supabase client...");
    const supabase = await createClient();

    console.log("🔵 [USER SYNC] Getting user from Supabase auth...");
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error("🔴 [USER SYNC] Supabase auth error:", authError);
      return NextResponse.json(
        { error: "Auth error", details: authError.message },
        { status: 401 }
      );
    }

    if (!user) {
      console.log("⚠️ [USER SYNC] No authenticated user found");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    console.log("✅ [USER SYNC] User authenticated:", {
      id: user.id,
      email: user.email,
    });

    // Check database connection
    console.log("🔵 [USER SYNC] Testing database connection...");
    try {
      await prisma.$connect();
      console.log("✅ [USER SYNC] Database connected successfully");
    } catch (dbError) {
      console.error("🔴 [USER SYNC] Database connection failed:", dbError);
      return NextResponse.json(
        { error: "Database connection failed", details: String(dbError) },
        { status: 500 }
      );
    }

    // Create or update user in database
    console.log("🔵 [USER SYNC] Upserting user to database...");
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

    console.log("✅ [USER SYNC] User synced successfully:", dbUser);

    return NextResponse.json({
      success: true,
      message: "User synced to database",
      user: dbUser,
    });
  } catch (error: any) {
    console.error("🔴 [USER SYNC] Error syncing user:", error);
    console.error("🔴 [USER SYNC] Error name:", error?.name);
    console.error("🔴 [USER SYNC] Error message:", error?.message);
    console.error("🔴 [USER SYNC] Error code:", error?.code);
    console.error("🔴 [USER SYNC] Error stack:", error?.stack);

    return NextResponse.json(
      {
        error: "Failed to sync user",
        details: error?.message || String(error),
        errorCode: error?.code,
        errorName: error?.name,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
    console.log("🔵 [USER SYNC] Database disconnected");
  }
}
