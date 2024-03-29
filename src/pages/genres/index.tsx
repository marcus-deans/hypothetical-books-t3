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
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import EditLink from "../../components/table-components/EditLink";
import DeleteLink from "../../components/table-components/DeleteLink";
import Box from "@mui/material/Box";
import StripedDataGrid from "../../components/table-components/StripedDataGrid";
import DetailLink from "../../components/table-components/DetailLink";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useSession } from "next-auth/react";
import type { CustomUser } from "../../schema/user.schema";

export default function Genres(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const genreQuery = api.genres.getAllWithOverallMetrics.useQuery({
    cursor: null,
    limit: 50,
  });
  
  const { data: session, status } = useSession();
  const user = session?.user as CustomUser;

  const genresWithOverallMetrics = genreQuery?.data?.items ?? [];

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Genre ID",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      width: 210,
    },
    {
      field: "name",
      headerName: "Genre Name",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="text-blue-600">
            {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/}
            <a href={`/genres/${params.id}/detail`}>{params.row.name} </a>
          </div>
        );
      },
    },
    {
      field: "bookCount",
      headerName: "Book Count",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      minWidth: 100,
    },
    {
      field: "edit",
      headerName: "Edit",
      headerClassName: "header-theme",
      maxWidth: 70,
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        <EditLink url={`/genres/${params.id}/edit`} />
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      headerClassName: "header-theme",
      maxWidth: 80,
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        <DeleteLink url={`/genres/${params.id}/delete`} />
      ),
    },
  ];

  const rows = genresWithOverallMetrics.map((genreWithOverallMetrics) => {
    return {
      id: genreWithOverallMetrics.genre.id,
      name: genreWithOverallMetrics.genre.name,
      bookCount: genreWithOverallMetrics.bookCount,
    };
  });

  return (
    <>
      <Head>
        <title>Genres</title>
      </Head>
      {user?.role === "admin" ? <div className="space flex h-3/4 overflow-hidden text-neutral-50">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            my: 1.5,
          }}
        >
          <h1 className="inline-block text-2xl"> Genres </h1>
          <Fab size="small" aria-label="add" href="/genres/add"
            sx={{
              ml: 1,
              backgroundColor: "rgb(59 130 246)",
              "&:hover": {
                backgroundColor: "rgb(29 78 216)",
              },
            }}
          >
            <AddIcon
              sx={{
                color: "white",
              }}
            />
          </Fab>
        </Box>
      </div> : 
      <div className="space mt-3 mb-5 flex h-3/4 overflow-hidden text-neutral-50">
        <h1 className="inline-block text-2xl"> Genres </h1>
      </div>}
      <div className="h-3/4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
        <Box
          sx={{
            height: "auto",
            "& .header-theme": {
              backgroundColor: "rgba(56, 116, 203, 0.35)",
            },
            "& .MuiDataGrid-cell--textLeft": {
              textAlign: "left",
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
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
            }}
            pageSize={10}
            rowsPerPageOptions={[10]}
            autoHeight={true}
            rowHeight={40}
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
  await ssg.genres.getAllWithOverallMetrics.prefetch({
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
