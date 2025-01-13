import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Get language from cookie or default to 'en'
  const lang = req.cookies.get("lang")?.value || "en";
  const pathname = req.nextUrl.pathname;
  const searchParams = req.nextUrl.searchParams;

  // Check for authentication if accessing admin dashboard
  if (pathname.startsWith("/admin-dashboard")) {
    // Get the authentication token from cookies
    const token = req.cookies.get("userData")?.value;

    if (!token) {
      // If no token exists, redirect to login page
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Continue with normal middleware processing for authenticated users
  }

  // Create new URL with language prefix
  const newUrl = new URL(`/${lang}${pathname}`, req.nextUrl);

  // Ignore files and specific paths
  if (
    /\.(png|svg|jpg|webp)$/.test(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  )
    return;

  // Rewrite the URL instead of redirecting
  const res = NextResponse.rewrite(newUrl);

  // Preserve search params
  res.headers.set("searchParams", searchParams.toString());

  return res;
}

// Combine the original matcher with admin dashboard protection
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/admin-dashboard/:path*",
  ],
};
