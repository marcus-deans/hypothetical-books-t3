import { withAuth } from "next-auth/middleware";


export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
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

export const config = {matcher: ["/books/:path*", "/sales/:path*", "/purchases/:path*", "/vendors/:path*", "/authors/:path*", "/genres/:path*", "/report/:path*"],};
