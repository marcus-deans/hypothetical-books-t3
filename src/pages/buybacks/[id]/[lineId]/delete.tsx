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

export default function DeleteBuybackLine(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const id = props.id;
  const lineId = props.lineId;
  const buybackLineDetailsQuery =
    api.buybackLines.getByIdWithBookPrimaries.useQuery({
      id: lineId,
    });
  const deleteMutation = api.buybackLines.delete.useMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  // if (router.isFallback) {
  if (buybackLineDetailsQuery.status !== "success") {
    return <div className="text-white">Loading...</div>;
  }
  const { data } = buybackLineDetailsQuery;

  const handleDelete = () => {
    setIsDeleting(true);
    try {
      const deleteResult = deleteMutation.mutate({ id: lineId });
      setTimeout(() => {
        void router.push(`/buybacks/${encodeURIComponent(id)}/detail`);
      }, 500);
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Delete Buyback Line</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DeletePane
        itemIdentifier={`${data?.book.title ?? "Buyback Line"}`}
        itemName={"Buyback Line"}
        isDeleting={isDeleting}
        handleDelete={handleDelete}
        cancelUrl={`/buybacks/${encodeURIComponent(id)}/detail`}
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const buybackLines = await prisma.buybackLine.findMany({
    select: {
      id: true,
      buybackOrder: {
        select: {
          id: true,
        },
      },
    },
  });
  const paths = buybackLines.map((buybackLine) => ({
    params: { id: buybackLine.buybackOrder.id, lineId: buybackLine.id },
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

  await ssg.buybackLines.getByIdWithBookPrimaries.prefetch({ id: lineId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
      lineId,
    },
    revalidate: 1,
  };
}
