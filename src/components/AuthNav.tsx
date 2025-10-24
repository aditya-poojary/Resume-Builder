"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/../lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthNav() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      // Redirect to home page
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return null; // Or a loading skeleton
  }

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <Link
            href="/resume/create"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            My Resumes
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
}
