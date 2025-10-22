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
    "/dashboard",
    "/resume/create",
    "/resume/my-resumes",
  ];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Auth routes (login, signup) - redirect to dashboard if already logged in
  const authRoutes = ["/login", "/signup"];
  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);

  // If user is not logged in and trying to access protected route
  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is logged in and trying to access auth routes
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/resume/:path*", "/login", "/signup"],
};
