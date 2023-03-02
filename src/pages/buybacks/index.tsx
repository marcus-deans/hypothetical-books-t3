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
import type { GridColDef } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import StripedDataGrid from "../../components/table-components/StripedDataGrid";
import EditLink from "../../components/table-components/EditLink";

export default function sales(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const buybackOrdersQuery =
    api.buybackOrders.getAllWithOverallMetrics.useQuery({
      cursor: null,
      limit: 50,
    });

  const buybackOrders = buybackOrdersQuery?.data?.items ?? [];

  const logger = new Logger({ name: "buybackOrdersLogger" });
  logger.info("buybackOrders", buybackOrders); // This is the only line that is different from the Books page

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Buyback Order ID",
      headerClassName: "header-theme",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Buyback Date",
      headerClassName: "header-theme",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="text-blue-600">
            {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/}
            <a href={`/buybacks/${params.id}/detail`}>{params.row.date} </a>
          </div>
        );
      },
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
    }
  ];

  const rows = buybackOrders.map((buybackOrder) => {
    return {
      id: buybackOrder.buybackOrder.id,
      date: buybackOrder.buybackOrder.date.toLocaleDateString(),
      totalQuantity: buybackOrder.totalQuantity,
      vendor: buybackOrder.buybackOrder.vendor.name,
      totalPrice: `$${buybackOrder.totalPrice.toFixed(2)}`,
      totalUniqueBooks: buybackOrder.totalUniqueBooks,
    };
  });

  return (
    <>
      <Head>
        <title>Buybacks</title>
      </Head>
      <div className="space mt-3 flex h-3/4 overflow-hidden text-neutral-50">
        <h1 className="inline-block text-2xl"> Buyback Orders </h1>
        <Link
          className="ml-2 inline-block text-2xl text-blue-600"
          href="/buybacks/add"
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
