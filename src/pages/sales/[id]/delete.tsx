import React, { useState } from "react";
import Head from "next/head";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { prisma } from "../../../server/db";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../server/api/root";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import superjson from "superjson";
import { api } from "../../../utils/api";
import { useRouter } from "next/router";
import DeletePane from "../../../components/DeletePane";
import { longFormatter } from "../../../utils/formatters";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteSalesReconciliation(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const salesDetailsQuery = api.salesReconciliations.getByIdWithSalesLineIds.useQuery({ id });
  const deleteMutation = api.salesReconciliations.delete.useMutation();
  const deleteLineMutation = api.salesLines.delete.useMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  // if (router.isFallback) {
  if (salesDetailsQuery.status !== "success") {
    return <div className="text-white">Loading...</div>;
  }
  const { data } = salesDetailsQuery;

  const salesType = data.userId === null ? "Record" : "Reconciliation";

  const handleDelete = () => {
    setIsDeleting(true);
    try {
      const deleteResult = deleteMutation.mutate({ id: id });
      setTimeout(() => {
        void router.push("/sales");
      }, 500);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      toast.error(`${error}`);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>{"Delete Sales ".concat(salesType)}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DeletePane
        itemIdentifier={longFormatter.format(data?.date) ?? id}
        itemName={"Sales ".concat(salesType)}
        isDeleting={isDeleting}
        handleDelete={handleDelete}
        cancelUrl={`/sales/${encodeURIComponent(id)}/detail`}
      />
      <ToastContainer></ToastContainer>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const salesReconciliations = await prisma.salesReconciliation.findMany({
    select: {
      id: true,
    },
  });

  const paths = salesReconciliations.map((salesReconciliation) => ({
    params: { id: salesReconciliation.id },
  }));

  console.log(paths);

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

  await ssg.salesReconciliations.getByIdWithSalesLineIds.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
