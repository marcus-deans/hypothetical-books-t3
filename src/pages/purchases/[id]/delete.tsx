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

export default function DeletePurchaseOrder(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const purchaseOrderQuery = api.purchaseOrders.getByIdWithOverallMetrics.useQuery({
    id,
  });
  const deleteMutation = api.purchaseOrders.delete.useMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  // if (router.isFallback) {
  if (purchaseOrderQuery.status !== "success") {
    return <div className="text-white">Loading...</div>;
  }
  const { data } = purchaseOrderQuery;

  const handleDelete = () => {
    setIsDeleting(true);
    try {
      if(data.purchaseOrderWithOverallMetrics.purchaseLines.length != 0){
        throw new Error("Purchase Order must have zero purchase lines to be deleted");
      }
      const deleteResult = deleteMutation.mutate({ id: id });
      setTimeout(() => {
        void router.push("/purchases");
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
        <title>Delete Purchase Order</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DeletePane
        itemIdentifier={longFormatter.format(data?.purchaseOrderWithOverallMetrics.date) ?? id}
        itemName={"Purchase Order"}
        isDeleting={isDeleting}
        handleDelete={handleDelete}
        cancelUrl={`/purchases/${encodeURIComponent(id)}/detail`}
      />
      <ToastContainer></ToastContainer>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const purchaseOrders = await prisma.purchaseOrder.findMany({
    select: {
      id: true,
    },
  });

  const paths = purchaseOrders.map((purchaseOrder) => ({
    params: { id: purchaseOrder.id },
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

  await ssg.purchaseOrders.getByIdWithOverallMetrics.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
