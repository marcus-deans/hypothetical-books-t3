import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Nav from '../components/Nav'
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Hypothetical Books Corp.</title>
      </Head>
]    </>
  );
};

export default Home;

