import React from "react";
import Head from "next/head";
import { api } from "../../utils/api";
import { createInnerTRPCContext } from "../../server/api/trpc";
import { appRouter } from "../../server/api/root";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import superjson from "superjson";
import Link from "next/link";
import type { GridColDef } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import StripedDataGrid from "../../components/table-components/StripedDataGrid";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function sales(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const buybackOrdersQuery =
    api.buybackOrders.getAllWithOverallMetrics.useQuery({
      cursor: null,
      limit: 50,
    });

  const buybackOrders = buybackOrdersQuery?.data?.items ?? [];

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Buyback Order ID",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      width: 210,
    },
    {
      field: "date",
      headerName: "Buyback Date",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.row.date);
        return (
          <div className="text-blue-600">
            {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/}
            <a href={`/buybacks/${params.id}/detail`}>{date.toLocaleDateString()} </a>
          </div>
        );
      },
    },
    {
      field: "user",
      headerName: "User",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      flex: 1,
    },
    {
      field: "vendor",
      headerName: "Vendor",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      flex: 1,
    },
    {
      field: "totalQuantity",
      headerName: "Total Quantity",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      minWidth: 110,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      renderCell: (params) => {
        return (
          <div>
            {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/}
            ${params.row.totalPrice}
          </div>
        );
      },
      minWidth: 110,
    },
    {
      field: "totalUniqueBooks",
      headerName: "Total Unique Books",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      minWidth: 150,
    },
  ];

  const rows = buybackOrders.map((buybackOrder) => {
    return {
      id: buybackOrder.buybackOrder.id,
      date: buybackOrder.buybackOrder.date.getTime(),
      user: buybackOrder.buybackOrder.user?.name ?? "N/A",
      totalQuantity: buybackOrder.totalQuantity,
      vendor: buybackOrder.buybackOrder.vendor.name,
      totalPrice: `${buybackOrder.totalPrice.toFixed(2)}`,
      totalUniqueBooks: buybackOrder.totalUniqueBooks,
    };
  });

  return (
    <>
      <Head>
        <title>Buybacks</title>
      </Head>
      <div className="space flex h-3/4 overflow-hidden text-neutral-50">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            my: 1.5,
          }}
        >
          <h1 className="inline-block text-2xl"> Buyback Orders </h1>
          <Fab size="small" aria-label="add" href="/buybacks/add"
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
      </div>
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
  await ssg.buybackOrders.getAllWithOverallMetrics.prefetch({
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
