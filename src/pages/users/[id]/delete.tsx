import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import superjson from "superjson";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../server/api/root";
import { api } from "../../../utils/api";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import DeletePane from "../../../components/DeletePane";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { prisma } from "../../../server/db";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import type { CustomUser } from "../../../schema/user.schema";

export default function DeleteUser(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data: session, status } = useSession();
  const user = session?.user as CustomUser;
  const exist = api.users.doesAdminExist.useQuery().data;
  const { id } = props;
  const userDetailsQuery = api.users.getById.useQuery({
    id,
  });

  const deleteMutation = api.users.delete.useMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  // if (router.isFallback) {
  if (userDetailsQuery.status !== "success") {
    return <div className="text-white">Loading...</div>;
  }
  const { data } = userDetailsQuery;

  const handleDelete = () => {
    if (userDetailsQuery.data.name == "admin") {
      toast.error("This account cannot be deleted because it is named admin");
      return;
    } else if (userDetailsQuery.data.name == user?.name) {
      toast.error("This account cannot be deleted because it your own account");
      return;
    } else {
      setIsDeleting(true);
      console.log("delete proceeded");
      try {
        const deleteResult = deleteMutation.mutate({ id: id });
        setTimeout(() => {
          void router.push("/users");
        }, 500);
      } catch (error) {
        console.log(error);
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Delete User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DeletePane
        itemIdentifier={data?.name ?? id}
        itemName={"User"}
        isDeleting={isDeleting}
        handleDelete={handleDelete}
        cancelUrl={`/users/${id}/detail`}
      />
      <ToastContainer></ToastContainer>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
    },
  });

  const paths = users.map((user) => ({
    params: { id: user.id },
  }));

  return { paths, fallback: true };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });
  const id = context.params?.id as string;

  await ssg.users.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
