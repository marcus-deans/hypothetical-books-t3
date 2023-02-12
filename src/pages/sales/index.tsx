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
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import StripedDataGrid from "../../components/table-components/StripedDataGrid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import DetailLink from "../../components/table-components/DetailLink";

export default function sales(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const salesReconciliationQuery =
    api.salesReconciliations.getAllWithOverallMetrics.useQuery({
      cursor: null,
      limit: 50,
    });

  const salesReconciliations = salesReconciliationQuery?.data?.items ?? [];

  const logger = new Logger({ name: "salesReconciliationsogger" });
  logger.info("salesReconciliations", salesReconciliations); // This is the only line that is different from the Books page

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Sales Reconciliation ID",
      headerClassName: "header-theme",
      width: 250,
    },
    {
      field: "date",
      headerName: "Reconciliation Date",
      headerClassName: "header-theme",
      width: 200,
    },
    {
      field: "totalQuantity",
      headerName: "Total Quantity",
      headerClassName: "header-theme",
      width: 150,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      headerClassName: "header-theme",
      width: 200,
    },
    {
      field: "totalUniqueBooks",
      headerName: "Total Unique Books",
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
        <DetailLink url={`/sales/${params.id}/detail`} />
      ),
    },
  ];

  const rows = salesReconciliations.map((salesReconciliation) => {
    return {
      id: salesReconciliation.salesReconciliation.id,
      date: salesReconciliation.salesReconciliation.date.toLocaleDateString(),
      totalQuantity: salesReconciliation.totalQuantity,
      totalPrice: `$${salesReconciliation.totalPrice.toFixed(2)}`,
      totalUniqueBooks: salesReconciliation.totalUniqueBooks,
    };
  });

  return (
    <>
      <Head>
        <title>Sales</title>
      </Head>
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
      <Link className="items-end px-6" href="/sales/add/line" passHref>
        <Button variant="contained" color="primary">
          Add Sales Line
        </Button>
      </Link>
      <Link
        className="items-end px-6"
        href="/sales/add/reconciliation"
        passHref
      >
        <Button variant="contained" color="primary">
          Add Sales Reconciliation
        </Button>
      </Link>
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
  await ssg.salesReconciliations.getAllWithOverallMetrics.prefetch({
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
