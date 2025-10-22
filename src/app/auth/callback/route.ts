// app/auth/callback/route.ts
import { createClient } from "@/../lib/supabase-server";
import { NextResponse } from "next/server";
import { prisma } from "@/../lib/prisma";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Create or update user in PostgreSQL database
      try {
        await prisma.user.upsert({
          where: { id: data.user.id },
          update: {
            email: data.user.email!,
            name:
              data.user.user_metadata?.name ||
              data.user.email?.split("@")[0] ||
              "User",
            updated_at: new Date(),
          },
          create: {
            id: data.user.id,
            email: data.user.email!,
            name:
              data.user.user_metadata?.name ||
              data.user.email?.split("@")[0] ||
              "User",
            created_at: new Date(),
            updated_at: new Date(),
          },
        });
      } catch (dbError) {
        console.error("Database error:", dbError);
        // Continue even if database fails - user is still authenticated
      }
    }
  }

  // Redirect to resume builder after successful authentication
  return NextResponse.redirect(new URL("/resume/create", request.url));
}
