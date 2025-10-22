import { createClient } from "./lib/supabase-server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protected routes that require authentication
  const protectedRoutes = [
    "/resume/create",
    "/resume/edit",
    "/resume/my-resumes",
  ];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Auth routes (login, signup) - redirect to resume builder if already logged in
  const authRoutes = ["/login", "/signup"];
  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);

  // If user is not logged in and trying to access protected route
  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is logged in and trying to access auth routes, redirect to resume builder
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL("/resume/create", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/resume/:path*", "/login", "/signup"],
};
