import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // const accessToken = localStorage.getItem("access_token");

  // if (accessToken) {
  //   if (request.nextUrl.pathname === "/") {
  //     return NextResponse.redirect(new URL("/home", request.url));
  //   }

  //   return NextResponse.next();
  // } else {
  //   // Redirect to the login page.
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/todos", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/:path*",
    "/todos/:path*",
    "/settings/:path*",
    "/profile/:path*",
  ],
};
