import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE } from "./constant";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname.includes("login");

  const authTokenCookie = request.cookies.get(AUTH_COOKIE);

  if (!authTokenCookie && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    authTokenCookie &&
    (isLoginPage || pathname.includes("register"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isLoginPage || pathname.includes("register")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
