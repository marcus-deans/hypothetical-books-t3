import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Nav from '../components/Nav'
import { getSession, signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const exist = api.users.doesUserExist.useQuery();
  const session = useSession();
  const auth = session.status === "authenticated" ;
  return (
    <>
      <Head>
        <title>Vendors</title>
      </Head>
      <main>
      <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
          onClick={() => {
              signIn();
          }}
        >
          {!auth  && !exist.error && "Login"}
      </button>
      <a 
          href="/auth/changePassword"
        >
          {auth && "Change Password"}
      </a>
      <button 
          onClick={()=>{
            signOut();
          }}
        >
          {auth && "LogOut"}
      </button>
        <a 
          href="/auth/register"
        >
          {exist.error && "Set Password"}
        </a>
      </main>
    </>
  );
};



export default Home;

