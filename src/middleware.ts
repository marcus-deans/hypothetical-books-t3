import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { CustomUser } from "./schema/user.schema";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    console.log("Running Middleware")
    const token = await getToken({ req });
    const protectedUserPaths = [
      "/books",
      "/sales",
      "/purchases",
      "/buybacks",
      "/vendors",
      "/authors",
      "/genres",
      "/report",
      "/users",
      "/shelfcalculator",
    ]
    const matchesProtectedUserPath = protectedUserPaths.some((path) =>
      pathname.startsWith(path)
    );
    if(!token){
      console.log("No Token Present")
      const url = new URL(`/auth/signin`, req.url);
      url.searchParams.set("callbackUrl", encodeURI(req.url));
      return NextResponse.redirect(url);
    }
    console.log(pathname)
    const protectedAdminPaths = ["/users"];

    const matchesProtectedPath = protectedAdminPaths.some((path) =>
      pathname.startsWith(path)
    );
    if (matchesProtectedPath) {
      console.log("Accesing Privileged Path")
      const user = token.user as CustomUser;
      if (!user || user.role !== "admin") {
        const url = new URL(`/403`, req.url);
        return NextResponse.rewrite(url);
      }
    }
    const protectedPathEnds = ["edit", "delete", "import"]
    const matchesProtectedPathEnd = protectedPathEnds.some((path) =>
    pathname.endsWith(path)
    );
    if (matchesProtectedPathEnd) {
      console.log("Accesing Privileged Path End")
      const user = token.user as CustomUser;
      if (!user || user.role !== "admin") {
        const url = new URL(`/403`, req.url);
        return NextResponse.rewrite(url);
      }
    }
    if(pathname.endsWith("add")){
      console.log("Accesing Privileged Add Path")
      const user = token.user as CustomUser;
      if (!user || user.role !== "admin") {
        const url = new URL(`/403`, req.url);
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
    "/users/:path*",
    "/shelfcalculator/:path*",
  ],
};
