import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Nav from "../components/Nav";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const exist = api.users.doesUserExist.useQuery();
  const session = useSession();
  const auth = session.status === "authenticated";
  return (
    <>
      <Head>
        <title>Vendors</title>
      </Head>
      <main>
        <button
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          onClick={() => {
            void signIn();
          }}
        >
          {!auth && !exist.error && "Login"}
        </button>
        <Link href="/auth/changePassword">{auth && "Change Password"}</Link>
        <button
          onClick={() => {
            void signOut();
          }}
        >
          {auth && "LogOut"}
        </button>
        <Link href="/auth/register">{exist.error && "Set Password"}</Link>
      </main>
    </>
  );
};

export default Home;
