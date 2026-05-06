import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("token")?.value;

  if (accessToken) {
    if (request.nextUrl.pathname === "/") {
      // Redirect to the dashboard home view.
      return NextResponse.redirect(new URL("/home", request.url));
    }

    return NextResponse.next();
  } else {
    // Redirect to the login page.
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: ["/", "/profile/:path*"],
};
