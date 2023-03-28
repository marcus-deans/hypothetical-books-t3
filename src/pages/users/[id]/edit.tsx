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
import EditPane from "../../../components/EditPane";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { prisma } from "../../../server/db";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import type { CustomUser } from "../../../schema/user.schema";

export default function EditUser(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data: session, status } = useSession();
  const user = session?.user as CustomUser;
  const { id } = props;
  const userDetailsQuery = api.users.getById.useQuery({
    id,
  });

  const deleteMutation = api.users.setPrivilege.useMutation();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  if (userDetailsQuery.status !== "success") {
    return <div>Loading...</div>;
  }
  const { data } = userDetailsQuery;

  const handleEdit = () => {
    if (userDetailsQuery.data.name == "admin") {
      toast.error("The admin account cannot have its privileges revoked");
      return;
    } else if (userDetailsQuery.data.name == user?.name) {
      toast.error(
        "This account cannot have its privileges revoked because it your own account"
      );
      return;
    } else {
      setIsEditing(true);
      console.log("User Edit proceeded");
      try {
        const deleteResult = deleteMutation.mutate({
          id: id,
          admin: !(data.role == "admin"),
        });
        setTimeout(() => {
          void router.push("/users/" + id + "/detail");
        }, 500);
      } catch (error) {
        console.log(error);
        setIsEditing(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Edit User Privilege</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EditPane
        currentPrivilege={data?.role == "admin" ?? false}
        itemIdentifier={data?.name ?? id}
        itemName={"User"}
        isEditing={isEditing}
        handleEdit={handleEdit}
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
