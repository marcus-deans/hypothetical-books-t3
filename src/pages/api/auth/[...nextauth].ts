import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
//import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";

const prisma = new PrismaClient();

const confirmPasswordwithHash = (plain: string, hashed: string) => {
  return new Promise((resolve) => {
    compare(plain, hashed, function (err, res) {
      resolve(res);
    });
  });
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        try {
          if (!credentials) {
            console.log("No credentials");
            return null;
          }
          // console.log(hash(credentials.password as string, 10));
          const user = await prisma.user.findFirst({
            where: {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              name: credentials.name,
            }
          });
          if (user !== null) {
            //compare the hash
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if(credentials.password == user.password){
              const userAccount = {
                id: user.id,
                name: user.name,
                role: user.role,
              };
              console.log("returning");
              return userAccount;
            }
            /*

            const res = await confirmPasswordwithHash(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              credentials.password,
              user.password
            );
            // console.log(hash(credentials.password, 10));
            if (res === true) {
              const userAccount = {
                id: user.id,
                name: user.name,
                role: user.role,
              };
              console.log("returning");
              return userAccount;
            
            } 
            */else {
              console.log("Hash not matched logging in");
              return null;
            }
          } else {
            console.log("No account registered");
            return null;
          }
        } catch (err) {
          console.log("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    // error: '/',
    // signOut: '/auth/signout'
  },
  callbacks: {
    async jwt({user, token}){
      if(user){
        token.user = user;
      }
      return Promise.resolve(token);
    },
    session: async ({session, token, user}) => {
      session.user = user;
      return Promise.resolve(session);
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
