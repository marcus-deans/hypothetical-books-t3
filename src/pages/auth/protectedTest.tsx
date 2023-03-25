import type { GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";

const ProtectedTest: NextPage = () => {
  return <div>This page is Protected for special people, like you.</div>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
}

export default ProtectedTest;
