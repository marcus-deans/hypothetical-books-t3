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

export default function DeleteVendor(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const genreDetailsQuery = api.genres.getById.useQuery({
    id,
  });
  const deleteMutation = api.genres.delete.useMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  // if (router.isFallback) {
  if (genreDetailsQuery.status !== "success") {
    return <div>Loading...</div>;
  }
  const { data } = genreDetailsQuery;

  const handleDelete = () => {
    setIsDeleting(true);
    try {
      const deleteResult = deleteMutation.mutate({ id: id });
      setTimeout(() => {
        void router.push("/authors");
      }, 500);
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Delete Genre</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DeletePane
        itemIdentifier={data?.name ?? id}
        itemName={"Author"}
        isDeleting={isDeleting}
        handleDelete={handleDelete}
        cancelUrl={`/genres/`}
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const genres = await prisma.genre.findMany({
    select: {
      id: true,
    },
  });

  const paths = genres.map((genre) => ({
    params: { id: genre.id },
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

  await ssg.genres.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
