import React from "react";
import Head from "next/head";
import { api } from "../../utils/api";
import { Logger } from "tslog";
import { createInnerTRPCContext } from "../../server/api/trpc";
import { appRouter } from "../../server/api/root";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import superjson from "superjson";
import Link from "next/link";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import DetailLink from "../../components/table-components/DetailLink";
import Box from "@mui/material/Box";
import StripedDataGrid from "../../components/table-components/StripedDataGrid";

export default function sales(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const purchaseOrderQuery =
    api.purchaseOrders.getAllWithOverallMetrics.useQuery({
      cursor: null,
      limit: 50,
    });

  const purchaseOrders = purchaseOrderQuery?.data?.items ?? [];

  const logger = new Logger({ name: "purchaseOrdersLogger" });
  logger.info("purchaseOrders", purchaseOrders); // This is the only line that is different from the Books page

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Purchase Order ID",
      headerClassName: "header-theme",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Order Date",
      headerClassName: "header-theme",
      flex: 1,
    },
    {
      field: "vendor",
      headerName: "Vendor",
      headerClassName: "header-theme",
      flex: 1,
    },
    {
      field: "totalQuantity",
      headerName: "Total Quantity",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 110,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 110,
    },
    {
      field: "totalUniqueBooks",
      headerName: "Total Unique Books",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 150,
    },
    {
      field: "detail",
      headerName: "Detail",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 70,
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        <DetailLink url={`/purchases/${params.id}/detail`} />
      ),
    },
  ];

  const rows = purchaseOrders.map((purchaseOrder) => {
    return {
      id: purchaseOrder.purchaseOrder.id,
      date: purchaseOrder.purchaseOrder.date.toLocaleDateString(),
      totalQuantity: purchaseOrder.totalQuantity,
      vendor: purchaseOrder.purchaseOrder.vendor.name,
      totalPrice: `$${purchaseOrder.totalPrice.toFixed(2)}`,
      totalUniqueBooks: purchaseOrder.totalUniqueBooks,
    };
  });

  return (
    <>
      <Head>
        <title>Purchases</title>
      </Head>
      <div className="space mt-3 flex h-3/4 overflow-hidden text-neutral-50">
        <h1 className="inline-block text-2xl"> Purchase Order </h1>
        <Link
          className="ml-2 inline-block text-2xl text-blue-600"
          href="/purchases/add"
        >
          {" "}
          +{" "}
        </Link>
      </div>
      <div className="space mt-3 flex h-3/4 overflow-hidden text-neutral-50">
        <h1 className="inline-block text-2xl"> Purchase Line </h1>
        <Link
          className="ml-2 inline-block text-2xl text-blue-600"
          href="/purchases/[id]/add"
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
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
            }}
            pageSize={14}
            rowsPerPageOptions={[14]}
            autoHeight={true}
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
  await ssg.purchaseOrders.getAllWithOverallMetrics.prefetch({
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
