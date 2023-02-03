import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "../../../server/db";
import { usersRouter } from "../../../server/api/routers/users.js";
import { api } from "../../../utils/api";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        const { password } = credentials as {
          password: string;
        };
        const user = api.users.login.useQuery({password: password});
        // perform you login logic
        // find out user from db

        // if everything is fine
        if (true){
          throw new Error("Hello from error land")
        }
        return {
          id: "1234",
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  /*
  callbacks: {
    jwt(params) {
      // update token
      if (params.user?.role) {
        params.token.role = params.user.role;
      }
      // return final_token
      return params.token;
    },
  },
  */
};

export default NextAuth(authOptions);
