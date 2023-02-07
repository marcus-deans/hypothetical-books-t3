import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Nav from '../components/Nav'
import { getSession, signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const yoa = api.users.doesUserExist.useQuery();
  const session = useSession();
  const auth = session.status === "authenticated" ;
  return (
    <>
      <Head>
        <title>Hypothetical Books Corp.</title>
      </Head>
      <div>Index</div>
      <main>
      <button 
          onClick={() => {
              signIn();
          }}
        >
          {!auth  && !yoa.error && "Login"}
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
          {yoa.error && "Set Password"}
        </a>
      </main>
    </>
  );
};



export default Home;

