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

export default function DeleteCase(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const caseDetailsQuery = api.cases.getById.useQuery({
    id,
  });

  const deleteMutation = api.cases.delete.useMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  // if (router.isFallback) {
  if (caseDetailsQuery.status !== "success") {
    return <div className="text-white">Loading...</div>;
  }
  const { data } = caseDetailsQuery;

  const handleDelete = () => {
    setIsDeleting(true);
    console.log("delete proceeded");
    try {
      const deleteResult = deleteMutation.mutate({ id: id });
      console.log(deleteResult)
      setTimeout(() => {
        void router.push("/designer");
      }, 500);
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Delete Case Design</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DeletePane
        itemIdentifier={data?.name ?? id}
        itemName={"Case Design"}
        isDeleting={isDeleting}
        handleDelete={handleDelete}
        cancelUrl={`/designer/`}
      />
      <ToastContainer></ToastContainer>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const cases = await prisma.case.findMany({
    select: {
      id: true,
    },
  });

  const paths = cases.map((caseA) => ({
    params: { id: caseA.id },
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

  await ssg.cases.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
