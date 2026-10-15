import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Fast path: bypass all auth calls for static assets, public marketing, and non-protected pages
  const isProtectedAdmin = pathname.startsWith("/admin");
  const isProtectedUser = pathname.startsWith("/dashboard") || pathname.startsWith("/learn");
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/forgot-password";

  // Check custom admin/test session cookies first
  const adminCookie = request.cookies.get("edupulse-admin-session")?.value;
  const testCookie = request.cookies.get("edupulse-test-session")?.value;

  if (adminCookie) {
    if (isAuthPage) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
    // Admin cookie grants access to admin, dashboard, and learn
    return response;
  }

  if (testCookie) {
    if (isAuthPage) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
    return response;
  }

  // Check if any Supabase auth cookies exist
  const hasSupabaseCookie = request.cookies
    .getAll()
    .some((c) => c.name.startsWith("sb-") && c.name.includes("-auth-token"));

  // If public page (not protected, not auth page) and no auth cookies, return immediately (0ms latency!)
  if (!isProtectedAdmin && !isProtectedUser && !isAuthPage) {
    return response;
  }

  // If protected route and no auth cookies, redirect to login immediately without remote network roundtrip
  if ((isProtectedAdmin || isProtectedUser) && !hasSupabaseCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // If auth page and no auth cookies, allow immediately
  if (isAuthPage && !hasSupabaseCookie) {
    return response;
  }

  // Only initialize Supabase client if an auth cookie actually exists
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("placeholder")) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Strict route protection for /admin
    if (isProtectedAdmin) {
      if (!user) {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        url.searchParams.set("next", pathname);
        return NextResponse.redirect(url);
      }

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roleData) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        url.searchParams.set("error", "unauthorized_admin_access");
        return NextResponse.redirect(url);
      }
    }

    // Strict route protection for /dashboard and /learn
    if (isProtectedUser) {
      if (!user) {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        url.searchParams.set("next", pathname);
        return NextResponse.redirect(url);
      }
    }

    // Redirect authenticated users away from auth pages
    if (user && isAuthPage) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  } catch {
    // If Supabase check fails on protected route, redirect to login
    if (isProtectedAdmin || isProtectedUser) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
