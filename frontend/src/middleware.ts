import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  // Paths that require authentication
  const protectedPaths = ["/", "/dashboard"];
  // Paths only for non-authenticated users
  const authPaths = ["/login", "/register"];

  const isProtected = protectedPaths.some((path) => 
    pathname === path || (path !== "/" && pathname.startsWith(path))
  );
  const isAuthPage = authPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/login", "/register"],
};