import { getToken, verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = getToken(request);
  const { pathname } = request.nextUrl;

  if (token) {
    const payload = await verifyToken(token);
    if (payload) {
      if (pathname === "/" || pathname === "/register") {
        return NextResponse.redirect(new URL("/home", request.url));
      }
      return NextResponse.next();
    }
  }

  if (pathname !== "/" && pathname !== "/register") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
