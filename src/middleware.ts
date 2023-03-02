import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    //console.log("In middleware");
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
  ],
};
