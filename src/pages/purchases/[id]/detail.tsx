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
import DeleteLink from "../../../components/table-components/DeleteLink";
import EditLink from "../../../components/table-components/EditLink";
import Box from "@mui/material/Box";
import StripedDataGrid from "../../../components/table-components/StripedDataGrid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@mui/material";

export default function PurchaseOrderDetail(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const purchaseOrderDetailsQuery =
    api.purchaseOrders.getByIdWithOverallMetrics.useQuery({ id });

  // if (router.isFallback) {
  if (purchaseOrderDetailsQuery.status !== "success") {
    return <div>Loading...</div>;
  }

  const { data } = purchaseOrderDetailsQuery;

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Book Title",
      headerClassName: "header-theme",
      flex: 1,
    },
    {
      field: "isbn_13",
      headerName: "ISBN 13",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 130,
    },
    {
      field: "unitWholesalePrice",
      headerName: "Unit Wholesale Price",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 150,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 80,
    },
    {
      field: "subtotal",
      headerName: "Subtotal",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 80,
    },
    {
      field: "edit",
      headerName: "Edit",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 60,
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        <EditLink url={`/purchases/${id}/${params.id}/edit`} />
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 70,
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        <DeleteLink url={`/purchases/${id}/${params.id}/delete`} />
      ),
    },
  ];
  const rows = data.purchaseOrderWithOverallMetrics.purchaseLines.map(
    (purchaseLine) => {
      return {
        id: purchaseLine.id,
        title: purchaseLine.book.title,
        isbn_13: purchaseLine.book.isbn_13,
        unitWholesalePrice: `$${purchaseLine.unitWholesalePrice.toFixed(2)}`,
        quantity: purchaseLine.quantity,
        subtotal: `$${(
          purchaseLine.unitWholesalePrice * purchaseLine.quantity
        ).toFixed(2)}`,
      };
    }
  );

  return (
    <>
      <Head>
        <title>Purchases</title>
      </Head>
      <Link className="items-end px-6" href={`/sales/${id}/edit`} passHref>
        <Button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded" variant="contained">
          Edit Purchase Order
        </Button>
      </Link>
      <Link className="items-end px-6" href={`/sales/${id}/delete`} passHref>
        <Button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded" variant="contained">
          Delete Sales Order
        </Button>
      </Link>
      <div className="mt-5 h-3/4 overflow-hidden rounded-t-lg border border-gray-200 bg-white shadow-md">
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
            rowsPerPageOptions={[14]}
            autoHeight={true}
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
      <div className="flex space-x-5 bg-white px-3 py-3 rounded-b-lg">
        <div className="text-large px-15 ">{`Grand Total: $${data.totalPrice.toFixed(2)}`}
        </div>
        <div className="text-large px-15 ">{`Vendor Name: ${data.purchaseOrderWithOverallMetrics.vendor.name}`}</div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const purchaseOrders = await prisma.purchaseOrder.findMany({
    select: {
      id: true,
    },
  });

  const paths = purchaseOrders.map((purchaseOrder) => ({
    params: { id: purchaseOrder.id },
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
    transformer: superjson,
  });
  const id = context.params?.id as string;

  await ssg.purchaseOrders.getByIdWithOverallMetrics.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
