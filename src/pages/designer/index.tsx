import { Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import type { GetServerSidePropsContext } from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../server/api/root";
import { createInnerTRPCContext } from "../../server/api/trpc";
import superjson from "superjson";
import { api } from "../../utils/api";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import EditLink from "../../components/table-components/EditLink";
import DeleteLink from "../../components/table-components/DeleteLink";
import Box from "@mui/material/Box";
import StripedDataGrid from "../../components/table-components/StripedDataGrid";
import React from "react";

export default function index() {
  const casesQuery = api.cases.getAll.useQuery({
    cursor: null,
    limit: 50,
  });

  const casesWithShelves = casesQuery?.data?.items ?? [];

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Case ID",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      width: 210,
    },
    {
      field: "name",
      headerName: "Case Name",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="text-blue-600">
            {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/}
            <a href={`/designer/${params.id}/detail`}>{params.row.name} </a>
          </div>
        );
      },
    },
    {
      field: "shelfCount",
      headerName: "Shelf Count",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      minWidth: 100,
    },
    {
      field: "width",
      headerName: "Width",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      minWidth: 100,
    },
    {
      field: "creator",
      headerName: "Creator",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      minWidth: 100,
    },
    {
      field: "editor",
      headerName: "Last Edited By",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      minWidth: 100,
    },
    {
      field: "editedAt",
      headerName: "Last Edited At",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
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
        <DeleteLink url={`/designer/${params.id}/delete`} />
      ),
    },
  ];

  const rows = casesWithShelves.map((caseWithShelves) => {
    return {
      id: caseWithShelves.id,
      name: caseWithShelves.name,
      shelfCount: caseWithShelves.shelfCount,
      width: caseWithShelves.width,
      creator: caseWithShelves.creator.name,
      editor: caseWithShelves.editor.name,
      editedAt: caseWithShelves.editedAt,
    };
  });

  return (
    <>
      <Head>
        <title>Case Designer</title>
      </Head>
      <div className="space mt-3 flex h-3/4 overflow-hidden text-neutral-50">
        <h1 className="inline-block text-2xl"> Case Designer </h1>
        <Link
          className="ml-2 inline-block text-2xl text-blue-600"
          href="/designer/design"
        >
          {" "}
          +{" "}
        </Link>
      </div>

      <div className="mt-5 h-3/4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
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

// return (
//   <>
//     <Head>
//       <title>Case Designer</title>
//     </Head>
//     <div className="pt-6">
//       <div className="inline-block rounded bg-white px-6 py-6">
//         <div className="space-y-5">
//           <div className="mb-2 block text-lg font-bold text-gray-700">
//             Welcome to Case Designer
//           </div>
//           <div className="relative space-y-3">
//             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
//             <div className="col-span-4">
//               <div className="space-y-20">
//                 <div className="flex justify-center space-x-10"></div>
//                 <Link href="/designer/design" passHref>
//                   <button className="btn inline-block flex items-center rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition  duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg">
//                     Add a New Case
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div className="pt-6">
//       <div className="inline-block rounded bg-white px-6 py-6">
//         <div className="space-y-5">
//           <div className="mb-2 block text-lg font-bold text-gray-700">
//             Select an Existing Case
//           </div>
//           <div className="relative space-y-3"></div>
//         </div>
//       </div>
//     </div>
//   </>
// );

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
  await ssg.cases.getAll.prefetch({
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
