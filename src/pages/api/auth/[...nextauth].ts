import NextAuth, { User, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
//import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from '@prisma/client'
import { compare }  from "bcrypt";

import { usersRouter } from "../../../server/api/routers/users.js";
import { api } from "../../../utils/api";

const prisma = new PrismaClient();
const bcrypt = require('bcrpyt');


const confirmPasswordwithHash = (plain: string, hashed: string) => {
  return new Promise(resolve =>{
    compare(plain, hashed, function(err, res) {
      resolve(res);
  });
  })
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials: any, req) {
        try{
          const user = await prisma.user.findFirst({});
          if (user !== null){
            //compare the hash
            const res = await confirmPasswordwithHash(credentials.password, user.password);
            if(res === true){
              const userAccount = {
                id: user.id,
                name: null,
                email: null,
                image: null
              };
              return userAccount
            }
            else{
              console.log("Hash not matched logging in");
              return null;
            }
          }
          else {
            console.log("No account registered")
            return null;
          }
        }
        catch (err){
          console.log("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
};

export default NextAuth(authOptions);