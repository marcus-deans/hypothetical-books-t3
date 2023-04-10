import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import superjson from "superjson";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../server/api/root";
import { api } from "../../../utils/api";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import { useState } from "react";
import { useRouter } from "next/router";
import { prisma } from "../../../server/db";

export default function EditAuthor(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const authorDetailsQuery = api.authors.getById.useQuery({
    id,
  });
  const editMutation = api.authors.edit.useMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authorName, setAuthorName] = useState(
    authorDetailsQuery?.data?.name ?? "Author Name"
  );
  const router = useRouter();
  // if (router.isFallback) {
  if (authorDetailsQuery.status !== "success") {
    return <div className="text-white">Loading...</div>;
  }
  const { data } = authorDetailsQuery;

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = event.target.value;
    setAuthorName(enteredName);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      const editResult = editMutation.mutate({ id: id, name: authorName });
      setTimeout(() => {
        void router.push("/authors");
      }, 500);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Edit Author</title>
      </Head>
      <div className="pt-6">
        <form className="inline-block rounded bg-white px-6 py-6">
          <div className="space-y-5">
            <div className="mb-2 block text-lg font-bold text-gray-700">
              Edit Author
            </div>
            <div className="relative space-y-3">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <div className="col-span-4">
                <div className="space-y-20">
                  <div className="flex justify-center space-x-10">
                    <input
                      className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                      id="author"
                      type="text"
                      value={authorName}
                      onChange={inputHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 align-middle font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="button"
                onClick={handleSubmit}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const authors = await prisma.author.findMany({
    select: {
      id: true,
    },
  });

  const paths = authors.map((author) => ({
    params: { id: author.id },
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

  await ssg.authors.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
