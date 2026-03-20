import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip auth for login page and auth API
  if (pathname === "/crm/login" || pathname === "/api/crm/auth") {
    return NextResponse.next();
  }

  const token = request.cookies.get("crm_session")?.value;
  const password = process.env.CRM_PASSWORD || "bluecore2024";

  if (token !== password) {
    if (pathname.startsWith("/api/crm")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/crm/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/crm/:path*", "/api/crm/:path*"],
};
