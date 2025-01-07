import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Get language from cookie or default to 'en'
  const lang = req.cookies.get("lang")?.value || "en";
  const pathname = req.nextUrl.pathname;
  const searchParams = req.nextUrl.searchParams;

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

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
