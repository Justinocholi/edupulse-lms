import { NextResponse, type NextRequest } from "next/server";

// This route is disabled — admin access requires proper login via /login
export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
}
