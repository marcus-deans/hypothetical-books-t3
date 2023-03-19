import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const exist = api.users.doesUserExist.useQuery();
  const session = useSession();
  const auth = session.status === "authenticated";
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-2 text-[color:white]">
            Welcome to Hypothetical Books!
          </h2>
          {!auth && !exist.error && "Login" ? <h3 className="text-2xl mb-8 pt-4 text-gray-200">
            Please Log In
          </h3> : <h3 className="text-2xl mb-8 pt-4 text-gray-200">
            Welcome Back!
          </h3>}
          <div className="space-x-2">
          {!auth && !exist.error && "Login" ? <button
            className="rounded bg-blue-500 py-2 px-4 font-bold text-[color:white] hover:bg-blue-700" id="loginButton" onClick={() => {
              void signIn();
            }}>
            Login
          </button> : null}
          {auth && "LogOut" ? <button className="rounded bg-blue-500 py-2 px-4 font-bold text-[color:white] hover:bg-blue-700"
            onClick={() => {
              void signOut();
            }}
          >
            <Link href="/auth/changePassword"></Link>{auth && "Log Out"}
          </button> : null}
          {auth && "Change Password" ? <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700" onClick={() => {
            void signOut();
          }}>
            <Link href="/auth/changePassword">{auth && "Change Password"}</Link>
          </button> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
