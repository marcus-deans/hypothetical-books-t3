import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import type { CustomUser } from "../schema/user.schema";

const Home: NextPage = (): JSX.Element => {
  const { data: session, status } = useSession();
  const user = session?.user as CustomUser;
  const exist = api.users.doesAdminExist.useQuery().data;
  const auth = status == "authenticated";
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
          {exist ? (auth ?
            <h3 className="text-2xl mb-8 pt-4 text-gray-200"> Welcome Back{user && user.name ? " " + user.name : "Nobody"}!</h3>
            : <h3 className="text-2xl mb-8 pt-4 text-gray-200">Please Log In</h3>)
            : <h3 className="text-2xl mb-8 pt-4 text-gray-200">Please Create Admin Account</h3>}
          <div className="space-x-2 mb-2">
            {!auth && exist ? <button
              className="rounded bg-blue-500 py-2 px-4 font-bold text-[color:white] hover:bg-blue-700" id="loginButton" onClick={() => {
                void signIn();
              }}>
              Login
            </button> : null}
            {auth ? <button className="rounded bg-blue-500 py-2 px-4 font-bold text-[color:white] hover:bg-blue-700"
              onClick={() => {
                void signOut();
              }}
            >
              Log Out
            </button> : null}
            {auth ? <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
              <Link href="/auth/changePassword">{auth && "Change Password"}</Link>
            </button> : null}
            {!auth && !exist ? <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
              <Link href="/auth/createAdmin">{!auth && !exist && "Create Admin Account"}</Link>
            </button> : null}
          </div>
          <div className="space-x-2 mb-2">
            {user && user.role == "admin" ? <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
              <Link href="/users">{"Go To User List"}</Link>
            </button> : null}
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;