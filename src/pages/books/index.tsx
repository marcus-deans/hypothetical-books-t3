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
import { Button } from "@mui/material";
import TableHeader from "../../components/table-components/TableHeader";
import BookRow from "../../components/table-components/BookRow";

export default function Books(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const booksQuery = api.books.getAllWithAuthorsAndGenre.useQuery({
    cursor: null,
    limit: 50,
  });

  const books = booksQuery?.data?.items ?? [];

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
                id={book.id}
                title={book.title}
                isbn_13={book.isbn_13}
                retailPrice={book.retailPrice}
                authors={book.authors.map((author) => author.name)}
                genre={book.genre.name}
                inventoryCount={book.inventoryCount}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="items-end  bg-white"></div>
      <Link className="items-end px-6" href="/books/add" passHref>
        <Button variant="contained" color="primary">
          Add Book
        </Button>
      </Link>
    </>
  );
}
// id: string;
// title: string;
// authors: string[];
// isbn_13: string;
// retailPrice: number;
// genre: string;
// inventoryCount: number;
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
  await ssg.books.getAllWithAuthorsAndGenre.prefetch({
    cursor: null,
    limit: 50,
  });
  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      // id,
    },
  };
}
