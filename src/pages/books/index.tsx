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
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DetailLink from "../../components/table-components/DetailLink";
import Box from "@mui/material/Box";
import StripedDataGrid from "../../components/table-components/StripedDataGrid";
import { GridToolbar } from "@mui/x-data-grid";

export default function Books(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const booksQuery = api.books.getAllWithAuthorsAndGenre.useQuery({
    cursor: null,
    limit: 50,
  });

  const books = booksQuery?.data?.items ?? [];

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Book Title",
      headerClassName: "header-theme",
      flex : 1,
    },
    {
      field: "author",
      headerName: "Author",
      headerClassName: "header-theme",
      flex : 1,
    },
    {
      field: "isbn_13",
      headerName: "ISBN-13",
      headerClassName: "header-theme",
      maxWidth : 140,
      flex : 1,
    },
    {
      field: "retailPrice",
      headerName: "Retail Price",
      headerClassName: "header-theme",
      maxWidth : 100,
      flex : 1,
    },
    {
      field: "genre",
      headerName: "Genre",
      headerClassName: "header-theme",
      maxWidth : 120,
      flex : 1,
    },
    {
      field: "inventoryCount",
      headerName: "Count",
      headerClassName: "header-theme",
      maxWidth : 80,
      flex : 1,
    },
    {
      field: "detail",
      headerName: "Detail",
      headerClassName: "header-theme",
      maxWidth : 70,
      align : "center",
      flex : 1,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        <DetailLink url={`/books/${params.id}/detail`} />
      ),
    },
  ];

  const rows = books.map((book) => {
    return {
      id: book.id,
      title: book.title,
      author: book.authors.map((author) => author.name).join(", "),
      isbn_13: book.isbn_13,
      retailPrice: `$${book.retailPrice.toFixed(2)}`,
      genre: book.genre.name,
      inventoryCount: book.inventoryCount,
    };
  });

  return (
    <>
      <Head>
        <title>Books</title>
      </Head>
      <div>
        <Link className="items-end px-6" href="/books/add" passHref>
          <Button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded" variant="contained">
            Add Book
          </Button>
        </Link>
      </div>
      <div className="mt-5 h-3/4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
        <Box
          sx={{
            height: 'auto',
            width: '100%',
            maxHeight: 750,
            "& .header-theme": {
              backgroundColor: "rgba(56, 116, 203, 0.35)",
            },
          }}
        >
          <StripedDataGrid
            rows={rows}
            columns={columns}
            components={{
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              Toolbar: GridToolbar,
            }}
            pageSize={10}
            autoHeight={true}
            rowsPerPageOptions={[10]}
            getRowHeight={() => 'auto'}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            getRowClassName={(params) =>
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
          />
        </Box>
      </div>
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
