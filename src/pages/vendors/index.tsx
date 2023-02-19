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
import Box from "@mui/material/Box";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import EditLink from "../../components/table-components/EditLink";
import DeleteLink from "../../components/table-components/DeleteLink";
import StripedDataGrid from "../../components/table-components/StripedDataGrid";
import DetailLink from "../../components/table-components/DetailLink";

export default function Vendors(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const vendorQuery = api.vendors.getAll.useQuery({
    cursor: null,
    limit: 50,
  });

  const vendors = vendorQuery?.data?.items ?? [];

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Vendor ID",
      headerClassName: "header-theme",
      flex: 1,
      width: 250,
    },
    {
      field: "name",
      headerName: "Vendor Name",
      headerClassName: "header-theme",
      flex: 1,
      width: 250,
    },
    {
      field: "detail",
      headerName: "Detail",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 70,
      align : "center",
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        <DetailLink url={`/vendors/${params.id}/detail`} />
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 70,
      align : "center",
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        <EditLink url={`/vendors/${params.id}/edit`} />
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 70,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        <DeleteLink url={`/vendors/${params.id}/delete`} />
      ),
    },
  ];

  const rows = vendors.map((vendor) => {
    return {
      id: vendor.id,
      name: vendor.name,
    };
  });

  console.log(rows);

  return (
    <>
      <Head>
        <title>Vendors</title>
      </Head>
      <Link className="items-end px-6" href="/vendors/add" passHref>
        <Button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded" variant="contained">
          Add Vendor
        </Button>
      </Link>
      <div className="mt-5 h-3/4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
        <Box
          sx={{
            height: 'auto',
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
  await ssg.vendors.getAll.prefetch({ cursor: null, limit: 50 });
  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      // id,
    },
  };
}
