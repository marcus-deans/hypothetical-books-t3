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
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { TRPCError } from "@trpc/server";

export default function DeleteSalesLine(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const id = props.id;
  const lineId = props.lineId;
  const salesLineDetailsQuery =
    api.salesLines.getByIdWithBookPrimaries.useQuery({
      id: lineId,
    });
  const deleteMutation = api.salesLines.delete.useMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  // if (router.isFallback) {
  if (salesLineDetailsQuery.status !== "success") {
    return <div>Loading...</div>;
  }
  const { data } = salesLineDetailsQuery;

  const handleDelete = () => {
    setIsDeleting(true);
    try {
      const deleteResult = deleteMutation.mutate({ id: lineId });
      // if (deleteResult?.error instanceof TRPCError) {
      //   const httpCode = getHTTPStatusCodeFromError(deleteResult);
      //   console.log(httpCode);
      //   setIsDeleting(false);
      // }
      setTimeout(() => {
        void router.push(`/sales/${encodeURIComponent(id)}/detail`);
      }, 500);
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Delete Sales Line</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DeletePane
        itemIdentifier={`Sale of ${data?.book.title ?? "Sales Line"}`}
        itemName={"Sales Line"}
        isDeleting={isDeleting}
        handleDelete={handleDelete}
        cancelUrl={`/sales/${encodeURIComponent(id)}/detail`}
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const salesLines = await prisma.salesLine.findMany({
    select: {
      id: true,
      salesReconciliation: {
        select: {
          id: true,
        },
      },
    },
  });
  const paths = salesLines.map((salesLine) => ({
    params: { id: salesLine.salesReconciliation.id, lineId: salesLine.id },
  }));

  // const paths = salesReconciliations.map((salesReconciliation) => {
  //   salesReconciliation.salesLines.map((salesLine) => ({
  //     params: { id: salesReconciliation.id, lineId: salesLine.id },
  //   }));
  // });

  // const salesLines = await prisma.salesLine.findMany({
  //   select: {
  //     id: true,
  //   },
  // });
  //
  // const paths = salesLines.map((salesLine) => ({
  //   params: { lineId: salesLine.id },
  // }));

  console.log(paths);

  return { paths, fallback: true };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string; lineId: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });
  const id = context.params?.id as string;
  const lineId = context.params?.lineId as string;

  await ssg.salesLines.getByIdWithBookPrimaries.prefetch({ id: lineId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
      lineId,
    },
    revalidate: 1,
  };
}
