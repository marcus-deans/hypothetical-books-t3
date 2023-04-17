import React, { useState } from "react";
import Head from "next/head";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import superjson from "superjson";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../../server/api/root";
import { api } from "../../../../utils/api";
import { createInnerTRPCContext } from "../../../../server/api/trpc";
import DeletePane from "../../../../components/DeletePane";
import { useRouter } from "next/router";
import { prisma } from "../../../../server/db";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeletePurchaseLine(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const id = props.id;
  const lineId = props.lineId;
  const purchaseLineDetailsQuery =
    api.purchaseLines.getByIdWithBookPrimaries.useQuery({
      id: lineId,
    });
  const deleteMutation = api.purchaseLines.delete.useMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  // if (router.isFallback) {
  if (purchaseLineDetailsQuery.status !== "success") {
    return <div className="text-white">Loading...</div>;
  }
  const { data } = purchaseLineDetailsQuery;

  const handleDelete = () => {
    setIsDeleting(true);
    try {
      if (purchaseLineDetailsQuery.data.book.inventoryCount < purchaseLineDetailsQuery.data.quantity){
        throw new Error("Deleting this purchase line would make inventory negative for this book");
      }
      const deleteResult = deleteMutation.mutate({ id: lineId });
      setTimeout(() => {
        void router.push(`/purchases/${encodeURIComponent(id)}/detail`);
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
        <title>Delete Purchase Line</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DeletePane
        itemIdentifier={`Purchase of ${data?.book.title ?? "Purchase Line"}`}
        itemName={"Purchase Line"}
        isDeleting={isDeleting}
        handleDelete={handleDelete}
        cancelUrl={`/purchases/${encodeURIComponent(id)}/detail`}
      />
    <ToastContainer></ToastContainer>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const purchaseLines = await prisma.purchaseLine.findMany({
    select: {
      id: true,
      purchaseOrder: {
        select: {
          id: true,
        },
      },
    },
  });
  const paths = purchaseLines.map((purchaseLine) => ({
    params: { id: purchaseLine.purchaseOrder.id, lineId: purchaseLine.id },
  }));

  return { paths, fallback: true };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string; lineId: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });
  const id = context.params?.id as string;
  const lineId = context.params?.lineId as string;

  await ssg.purchaseLines.getByIdWithBookPrimaries.prefetch({ id: lineId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
      lineId,
    },
    revalidate: 1,
  };
}
