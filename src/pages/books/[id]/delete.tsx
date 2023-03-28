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

export default function DeleteBook(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const bookDetailsQuery = api.books.getById.useQuery({
    id,
  });

  const bookCount = bookDetailsQuery.data?.inventoryCount;
  const deleteMutation = api.books.delete.useMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  // if (router.isFallback) {
  if (bookDetailsQuery.status !== "success") {
    return <div>Loading...</div>;
  }
  const { data } = bookDetailsQuery;

  const handleDelete = () => {
    if (bookCount && bookCount > 0) {
      toast.error(
        "This book does not have 0 inventory, so it cannot be deleted."
      );
    } else {
      setIsDeleting(true);
      try {
        const deleteResult = deleteMutation.mutate({ id: id });
        setTimeout(() => {
          void router.push("/books");
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
        <title>Delete Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DeletePane
        itemIdentifier={data?.title ?? id}
        itemName={"Book"}
        isDeleting={isDeleting}
        handleDelete={handleDelete}
        cancelUrl={`/books/`}
      />
      <ToastContainer></ToastContainer>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const books = await prisma.book.findMany({
    select: {
      id: true,
    },
  });

  const paths = books.map((book) => ({
    params: { id: book.id },
  }));

  return { paths, fallback: true };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });
  const id = context.params?.id as string;

  await ssg.books.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
