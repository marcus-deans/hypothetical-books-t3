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
import ModalImage from "react-modal-image";
import type { GridColDef } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import StripedDataGrid from "../../components/table-components/StripedDataGrid";

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
      field: "image",
      headerName: "Cover",
      headerClassName: "header-theme",
    
      renderCell: (params) => {
        return (
          <div className="text-blue-600">
              <ModalImage
  small={params.row.imgLink}
  large={params.row.imgLink}
  alt="cover"
/>;
          </div>
        );
      },
    },
    {
      field: "title",
      headerName: "Title",
      headerClassName: "header-theme",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="text-blue-600">
            {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/}
            <a href={`/books/${params.id}/detail`}>{params.row.title} </a>
          </div>
        );
      },
    },
    {
      field: "author",
      headerName: "Author",
      headerClassName: "header-theme",
      flex: 1,
    },
    {
      field: "isbn_13",
      headerName: "ISBN-13",
      headerClassName: "header-theme",
      maxWidth: 140,
      flex: 1,
    },
    {
      field: "retailPrice",
      headerName: "Retail Price",
      headerClassName: "header-theme",
      maxWidth: 100,
      flex: 1,
    },
    {
      field: "genre",
      headerName: "Genre",
      headerClassName: "header-theme",
      maxWidth: 120,
      flex: 1,
    },
    {
      field: "inventoryCount",
      headerName: "Inventory",
      headerClassName: "header-theme",
      maxWidth: 80,
      flex: 1,
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
      imgLink : "https://images.pexels.com/photos/1122870/pexels-photo-1122870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    };
  });

  return (
    <>
      <Head>
        <title>Books</title>
      </Head>
      <div className="space mt-3 flex h-3/4 overflow-hidden text-neutral-50">
        <h1 className="inline-block text-2xl"> Books </h1>
        <Link
          className="ml-2 inline-block text-2xl text-blue-600"
          href="/books/add"
        >
          {" "}
          +{" "}
        </Link>
      </div>
      <div className="mt-5 h-3/4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
        <Box
          sx={{
            height: "auto",
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
            pageSize={14}
            autoHeight={true}
            rowsPerPageOptions={[14]}
            getRowHeight={() => "auto"}
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
