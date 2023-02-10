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
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import StripedDataGrid from "../../../components/table-components/StripedDataGrid";
import Link from "next/link";
import { Button } from "@mui/material";
import Head from "next/head";

export default function SalesOrderDetail(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const id = props.id;
  const salesDetailsQuery =
    api.salesReconciliations.getByIdWithOverallMetrics.useQuery({ id });

  // if (router.isFallback) {
  if (salesDetailsQuery.status !== "success") {
    return <div>Loading...</div>;
  }

  const { data } = salesDetailsQuery;

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Book Title",
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
      field: "unitWholesalePrice",
      headerName: "Unit Wholesale Price",
      headerClassName: "header-theme",
      width: 150,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerClassName: "header-theme",
      width: 200,
    },
    {
      field: "subtotal",
      headerName: "Subtotal",
      headerClassName: "header-theme",
      width: 200,
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
        <EditLink url={`/sales/${id}/${params.id}/edit`} />
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
        <DeleteLink url={`/sales/${id}/${params.id}/delete`} />
      ),
    },
  ];

  const rows = data.salesReconciliationWithOverallMetrics.salesLines.map(
    (salesLine) => {
      return {
        id: salesLine.id,
        title: salesLine.book.title,
        isbn_13: salesLine.book.isbn_13,
        unitWholesalePrice: `$${salesLine.unitWholesalePrice.toFixed(2)}`,
        quantity: salesLine.quantity,
        subtotal: `$${(
          salesLine.unitWholesalePrice * salesLine.quantity
        ).toFixed(2)}`,
      };
    }
  );

  return (
    <>
      <Head>
        <title>Sales Detail</title>
      </Head>
      <div className="m-5 h-3/4 space-y-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
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
            // rowsPerPageOptions={[5]}
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
      <div className="text-large bg-white py-3 px-6">{`Grand Total: $${data.totalPrice.toFixed(
        2
      )}`}</div>
      <Link className="items-end px-6" href={`/sales/${id}/edit`} passHref>
        <Button variant="contained" color="primary">
          Edit Sales Reconciliation
        </Button>
      </Link>
      <Link className="items-end px-6" href={`/sales/${id}/delete`} passHref>
        <Button variant="contained" color="primary">
          Delete Sales Reconciliation
        </Button>
      </Link>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const salesReconciliations = await prisma.salesReconciliation.findMany({
    select: {
      id: true,
    },
  });

  const paths = salesReconciliations.map((salesReconciliation) => ({
    params: { id: salesReconciliation.id },
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

  await ssg.salesReconciliations.getByIdWithOverallMetrics.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
