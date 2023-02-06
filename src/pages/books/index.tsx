import Head from "next/head";
import React, { useState } from "react";
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
import SalesReconciliationRow from "../../components/SalesReconciliationRow";
import TableHeader from "../../components/TableHeader";
import BookRow from "../../components/BookRow";

export default function Books(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const booksQuery = api.books.getAllWithAuthorsAndGenre.useQuery({
    cursor: null,
    limit: 50,
  });

  const books = booksQuery?.data?.items ?? [];

  // salesReconciliationWithMetrics?.data?.totalQuantity.toString() ??
  // ("0");

  const tableHeaders = [
    "Title",
    "Author",
    "ISBN",
    "Retail Price",
    "Genre",
    "Inventory Count",
  ];

  return (
    <>
      <Head>
        <title>Books</title>
      </Head>
      <div className="m-5 overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map((tableHeader) => (
                <TableHeader text={tableHeader} key={tableHeader} />
              ))}
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                <div className="flex items-center">View Detail</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {books.map((book) => (
              <BookRow
                key={book.id}
                title={book.title}
                isbn_13={book.isbn_13}
                retailPrice={book.retailPrice}
                authors={book.authors}
                genre={book.genre.name}
                inventoryCounts={book.inventoryCount}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Link href="/books/add">Add Book</Link>
    </>
  );

  // id: string;
  // title: string;
  // authors: string[];
  // isbn_13: string;
  // retailPrice: number;
  // genre: string;
  // inventoryCount: number;
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
  await ssg.books.getAll.prefetch({ cursor: null, limit: 50 });
  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      // id,
    },
  };
}
