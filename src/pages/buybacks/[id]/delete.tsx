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

export default function DeleteBuybackOrder(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const buybackOrderDeleteQuery = api.buybackOrders.getById.useQuery({
    id,
  });
  const deleteMutation = api.buybackOrders.delete.useMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  // if (router.isFallback) {
  if (buybackOrderDeleteQuery.status !== "success") {
    return <div>Loading...</div>;
  }
  const { data } = buybackOrderDeleteQuery;

  const handleDelete = () => {
    setIsDeleting(true);
    try {
      const deleteResult = deleteMutation.mutate({ id: id });
      setTimeout(() => {
        void router.push("/buybacks");
      }, 500);
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Delete Buyback Order</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DeletePane
        itemIdentifier={data?.date.toLocaleDateString() ?? id}
        itemName={"Buy Back"}
        isDeleting={isDeleting}
        handleDelete={handleDelete}
        cancelUrl={`/buybacks/${encodeURIComponent(id)}/detail`}
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const buybackOrders = await prisma.buybackOrder.findMany({
    select: {
      id: true,
    },
  });

  const paths = buybackOrders.map((buybackOrder) => ({
    params: { id: buybackOrder.id },
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

  await ssg.buybackOrders.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
