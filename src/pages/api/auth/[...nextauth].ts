import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
//import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from '@prisma/client'
import { compare, hash }  from "bcrypt";

const prisma = new PrismaClient();


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
      async authorize(credentials, req) {
        try{
          console.log(hash(credentials.password as string, 10));
          const user = await prisma.user.findFirst({});
          if (user !== null){
            //compare the hash
            const res = await confirmPasswordwithHash(credentials.password, user.password);
            console.log(hash(credentials.password, 10));
            if(res === true){
              const userAccount = {
                id: user.id,
                name: null,
                email: null,
                image: null
              };
              console.log("returning");
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
  callbacks: {
    redirect({ baseUrl }) {
      console.log(baseUrl)
      return baseUrl
    }
  }
};

export default NextAuth(authOptions);