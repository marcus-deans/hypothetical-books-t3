import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { CustomUser } from "./schema/user.schema";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req: NextRequest) {
    console.log("Running Middleware")
    const { pathname } = req.nextUrl;
    const protectedPaths = ["/users"];
    const protectedPathTypes = ["edit", "delete", "add"]
    const matchesProtectedPath = protectedPaths.some((path) =>
      pathname.startsWith(path) || pathname.endsWith(path)
    );
    if (matchesProtectedPath) {
      console.log("Accesing Privileged Path")
      const token = await getToken({ req });
      if (!token) {
        const url = new URL(`/signin`, req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }
      const user = token.user as CustomUser;
      if (!user || user.role !== "admin") {
        const url = new URL(`/`, req.url);
        return NextResponse.rewrite(url);
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
);

export const config = {
  matcher: [
    "/books/:path*",
    "/sales/:path*",
    "/purchases/:path*",
    "/buybacks/:path*",
    "/vendors/:path*",
    "/authors/:path*",
    "/genres/:path*",
    "/report/:path*",
    "/users/:path*"
  ],
};
