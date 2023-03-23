import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import type { CustomUser } from "../../schema/user.schema";

const UserList: NextPage = (): JSX.Element => {
  const { data: session, status } = useSession();
  const user = session?.user as CustomUser;
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <div className="py-20">
      {user && user.role == "admin" ? <p>You are in the right place my admin King</p> : <p>You RAT BASTARD, Get out of here</p>}
      </div>
    </>
  );
}
export default UserList;