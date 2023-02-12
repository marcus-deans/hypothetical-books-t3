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
import EditLink from "../../../components/table-components/EditLink";
import DeleteLink from "../../../components/table-components/DeleteLink";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import StripedDataGrid from "../../../components/table-components/StripedDataGrid";

export default function BookDetail(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const bookDetailsQuery = api.books.getByIdWithAuthorAndGenre.useQuery({ id });

  // if (router.isFallback) {
  if (bookDetailsQuery.status !== "success") {
    return <div>Loading...</div>;
  }

  const { data } = bookDetailsQuery;

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Book Title",
      headerClassName: "header-theme",
      width: 300,
    },
    {
      field: "author",
      headerName: "Author",
      headerClassName: "header-theme",
      width: 300,
    },
    {
      field: "isbn_13",
      headerName: "ISBN 13",
      headerClassName: "header-theme",
      width: 200,
    },
    {
      field: "isbn_10",
      headerName: "ISBN 10",
      headerClassName: "header-theme",
      width: 200,
    },
    {
      field: "publisher",
      headerName: "Publisher",
      headerClassName: "header-theme",
      width: 200,
    },
    {
      field: "inventoryCount",
      headerName: "Inventory",
      headerClassName: "header-theme",
      width: 150,
    },
    {
      field: "retailPrice",
      headerName: "Retail Price",
      headerClassName: "header-theme",
      width: 150,
    },
    {
      field: "genre",
      headerName: "Genre",
      headerClassName: "header-theme",
      width: 200,
    },
    {
      field: "publicationYear",
      headerName: "Publication Year",
      headerClassName: "header-theme",
      width: 150,
    },
    {
      field: "pageCount",
      headerName: "Page Count",
      headerClassName: "header-theme",
      width: 150,
    },
    {
      field: "width",
      headerName: "Width",
      headerClassName: "header-theme",
      width: 100,
    },
    {
      field: "height",
      headerName: "Height",
      headerClassName: "header-theme",
      width: 100,
    },
    {
      field: "thickness",
      headerName: "Thickness",
      headerClassName: "header-theme",
      width: 100,
    },
    {
      field: "edit",
      headerName: "Edit",
      headerClassName: "header-theme",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        <EditLink url={`/books/${id}/edit`} />
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      headerClassName: "header-theme",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        <DeleteLink url={`/books/${id}/delete`} />
      ),
    },
  ];
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

  const rows = [
    {
      id: data.id,
      title: data.title,
      isbn_13: data.isbn_13,
      genre: data.genre.name,
      retailPrice: `$${data.retailPrice.toFixed(2)}`,
      inventoryCount: data.inventoryCount,
      isbn_10: data.isbn_10,
      publisher: data.publisher,
      publicationYear: data.publicationYear,
      pageCount: data.pageCount,
      author: data.authors.map((author) => author.name).join(", "),
    },
  ];

  return (
    <div className="m-5 h-3/4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
      <Box
        sx={{
          height: 400,
          width: "100%",
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
          rowsPerPageOptions={[10]}
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
