import Head from "next/head";
import React from "react";
import { api } from "../../utils/api";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../server/api/root";
import { createInnerTRPCContext } from "../../server/api/trpc";
import superjson from "superjson";
import Link from "next/link";
import TableHeader from "../../components/table-components/TableHeader";
import AuthorRow from "../../components/table-components/AuthorRow";
import { Button } from "@mui/material";

export default function Authors(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const authorQuery = api.authors.getAll.useQuery({
    cursor: null,
    limit: 50,
  });

  const authors = authorQuery?.data?.items ?? [];

  const tableHeaders = ["Name"];

  return (
    <>
      <Head>
        <title>Authors</title>
      </Head>
      <Link className="items-end px-6" href="/authors/add" passHref>
      <Button variant="contained" color="primary">Add Author</Button>
        </Link>
      <div className="m-5 overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map((tableHeader) => (
                <TableHeader text={tableHeader} key={tableHeader} />
              ))}
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                <div className="flex items-center">Edit</div>
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                <div className="flex items-center">Delete</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {authors.map((author) => (
              <AuthorRow key={author.id} id={author.id} name={author.name} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="items-end  bg-white">
      </div>
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    //eslint-disable-next-line
    transformer: superjson,
  });
  // const id = context.params?.id as string;
  /*
   * Prefetching the `post.byId` query here.
   * `prefetch` does not return the result and never throws - if you need that behavior, use `fetch` instead.
   */
  await ssg.authors.getAll.prefetch({ cursor: null, limit: 50 });
  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      // id,
    },
  };
}
