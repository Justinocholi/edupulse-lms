import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const next = request.nextUrl.searchParams.get("next") || "/admin";
  const redirectUrl = new URL(next, request.nextUrl.origin);

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set(
    "edupulse-admin-session",
    JSON.stringify({
      id: "10000001-0000-0000-0000-000000000003",
      email: "admin@edupulse.io",
      full_name: "Platform Administrator",
      role: "admin",
      avatar_url:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    }),
    {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "lax",
    }
  );

  return response;
}

export async function POST(request: NextRequest) {
  return GET(request);
}
