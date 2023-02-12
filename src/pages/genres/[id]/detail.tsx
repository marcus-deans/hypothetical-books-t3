import type { GetStaticPaths, GetStaticPropsContext } from "next";
import { prisma } from "../../../server/db";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../server/api/root";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import superjson from "superjson";
import type { InferGetStaticPropsType } from "next";
import { api } from "../../../utils/api";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import StripedDataGrid from "../../../components/table-components/StripedDataGrid";
import React from "react";
import DetailLink from "../../../components/table-components/DetailLink";

export default function GenreDetail(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const genreDetailsQuery = api.genres.getByIdWithBooksAndAuthors.useQuery({
    id,
  });

  // if (router.isFallback) {
  if (genreDetailsQuery.status !== "success") {
    return <div>Loading...</div>;
  }

  const { data } = genreDetailsQuery;

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
      field: "genre",
      headerName: "Genre",
      headerClassName: "header-theme",
      width: 200,
    },
    {
      field: "detail",
      headerName: "Detail",
      headerClassName: "header-theme",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        <DetailLink url={`/books/${params.id}/detail`} />
      ),
    },
  ];

  const rows = data.books.map((book) => {
    return {
      id: book.id,
      title: book.title,
      author: book.authors.map((author) => author.name).join(", "),
      isbn_13: book.isbn_13,
      genre: data.name,
    };
  });

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
  const genres = await prisma.genre.findMany({
    select: {
      id: true,
    },
  });

  const paths = genres.map((genre) => ({
    params: { id: genre.id },
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

  await ssg.genres.getByIdWithBooksAndAuthors.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
