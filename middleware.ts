import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("hello");
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if(token) {
            return true;
    }},
    },
    pages: {
        signIn: '/auth/signin'
    }
  }
);

export const config = {matcher: ["/books/:path*", "/books", "/sales/:path*", "/purchases/:path*", "/vendors/:path*", "/authors/:path*", "/genres/:path*", "/report/:path*"],};
