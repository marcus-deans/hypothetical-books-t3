import React from "react";
import { api } from "../../../utils/api";
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
import TableHeader from "../../../components/table-components/TableHeader";
import BookDetailRow from "../../../components/table-components/BookDetailRow";
import EditLink from "../../../components/table-components/EditLink";
import DeleteLink from "../../../components/table-components/DeleteLink";

export default function Detail(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const bookDetailsQuery = api.books.getByIdWithAuthorAndGenre.useQuery({ id });

  // if (router.isFallback) {
  if (bookDetailsQuery.status !== "success") {
    return <div>Loading...</div>;
  }

  const { data } = bookDetailsQuery;

  // id          			String @id @default(cuid())
  // title       			String
  // authors     			Author[]
  // isbn_13     			String
  // isbn_10                  String?
  //   publisher                String
  // publicationYear          Int
  // pageCount                Int
  // width                    Float
  // height                   Float
  // thickness                Float
  // retailPrice              Float
  // genre                    Genre @relation(fields: [genreId], references: [lineId])
  // genreId                  String // relation String field
  // purchaseLines            PurchaseLine[]
  // salesReconciliationLines SalesLine[]
  // //to Be determined
  // inventoryCount           Int

  const tableHeaders = [
    "Title",
    "Author",
    "ISBN-13",
    "ISBN-10",
    "Retail Price",
    "Genre",
    "Inventory Count",
    "Publisher",
    "Page Count",
    "Publication Year",
    "Dimensions (W*H*T)",
    "Actions",
  ];

  return (
    <table className="w-full border-separate bg-white text-left text-sm text-gray-500">
      <thead className="space-x-4 bg-gray-50">
        <tr className="space-x-4 rounded-md">
          {tableHeaders.map((tableHeader) => (
            <TableHeader text={tableHeader} key={tableHeader} />
          ))}
          <th scope="col" className="px-4 py-2 font-normal text-gray-900">
            {/*TODO: add delete button*/}
            <DeleteLink url={`/sales/${encodeURIComponent(props.id)}/edit`} />
            {/*TODO: Add edit button*/}
            <EditLink url={`/sales/${encodeURIComponent(props.id)}/edit`} />
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        <BookDetailRow
          key={data.id}
          id={data.id}
          title={data.title}
          isbn_13={data.isbn_13}
          isbn_10={data?.isbn_10 ?? "N/A"}
          retailPrice={data.retailPrice}
          authors={data.authors.map((author) => author.name)}
          genre={data.genre.name}
          inventoryCount={data.inventoryCount}
          publisher={data.publisher}
          pageCount={data.pageCount}
          publicationYear={data.publicationYear}
          dimensions={
            data.width == 0 || data.height == 0 || data.thickness == 0
              ? "Unknown"
              : `${data.width} x ${data.height} x ${data.thickness}`
          }
        />
      </tbody>
    </table>
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

  console.log(paths);

  return { paths, fallback: true };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    //eslint-disable-next-line
    transformer: superjson,
  });
  const id = context.params?.id as string;

  await ssg.books.getByIdWithAuthorAndGenre.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
