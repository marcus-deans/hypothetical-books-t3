import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import type { CustomUser } from "../schema/user.schema";

const Unauthorized: NextPage = (): JSX.Element => {
  const { data: session, status } = useSession();
  const user = session?.user as CustomUser;
  return (
    <>
      <Head>
        <title>403 - UNAUTHORIZED</title>
      </Head>
      <div className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-2 text-[color:white]">
            You are not authorized to view that page
          </h2>
          {user ? 
            <h3 className="text-2xl mb-8 pt-4 text-red-200"> Dear {user && user.name ? " " + user.name : "Nobody"}, only admins can use this page. Please Proceed Back</h3>
            : null}
        </div>
      </div>
    </>
  );
}
export default Unauthorized;