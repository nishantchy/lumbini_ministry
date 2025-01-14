import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Get language from cookie or default to 'en'
  const lang = req.cookies.get("lang")?.value || "en";
  const pathname = req.nextUrl.pathname;
  const searchParams = req.nextUrl.searchParams;

  // Ignore files and specific paths early
  if (
    /\.(png|svg|jpg|webp)$/.test(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return;
  }

  // Check for admin dashboard access
  if (pathname.startsWith("/admin-dashboard")) {
    const token = req.cookies.get("userData")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Only rewrite if the path doesn't already start with a language prefix
  if (!pathname.startsWith(`/${lang}`)) {
    // Create new URL with language prefix
    const newUrl = new URL(`/${lang}${pathname}`, req.nextUrl);

    // Rewrite the URL instead of redirecting
    const res = NextResponse.rewrite(newUrl);

    // Preserve search params
    res.headers.set("searchParams", searchParams.toString());

    return res;
  }

  // If path already has language prefix, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/admin-dashboard/:path*",
  ],
};
