import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, isTestMode } from "@/lib/db/data-store";

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  cookieStore.delete("edupulse-admin-session");
  cookieStore.delete("edupulse-test-session");

  // Wipe all Supabase auth cookies
  const allCookies = cookieStore.getAll();
  for (const cookie of allCookies) {
    if (cookie.name.startsWith("sb-")) {
      cookieStore.delete(cookie.name);
    }
  }

  if (isSupabaseConfigured() && !isTestMode()) {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {}
  }

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";

  const response = NextResponse.redirect(url);
  response.cookies.delete("edupulse-admin-session");
  response.cookies.delete("edupulse-test-session");

  for (const cookie of allCookies) {
    if (cookie.name.startsWith("sb-")) {
      response.cookies.delete(cookie.name);
    }
  }

  return response;
}

export const dynamic = "force-dynamic";
