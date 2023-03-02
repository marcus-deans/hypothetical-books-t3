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
import { api } from "../../../utils/api";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import StripedDataGrid from "../../../components/table-components/StripedDataGrid";
import React from "react";
import DetailLink from "../../../components/table-components/DetailLink";

export default function VendorDetail(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const vendorDetailsQuery = api.vendors.getByIdWithPurchaseOrders.useQuery({
    id,
  });

  // if (router.isFallback) {
  if (vendorDetailsQuery.status !== "success") {
    return <div>Loading...</div>;
  }

  const { data } = vendorDetailsQuery;

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Purchase Order Date",
      headerClassName: "header-theme",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="text-blue-600">
            {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/}
            <a href={`/purchases/${params.id}/detail`}>{params.row.date} </a>
          </div>
        );
      },
    },
    {
      field: "id",
      headerName: "Purchase Order ID",
      headerClassName: "header-theme",
      flex: 1,
    },
    {
      field: "vendor",
      headerName: "Vendor",
      headerClassName: "header-theme",
      flex: 1,
    },
  ];

  const rows = data.purchaseOrder.map((purchaseOrder) => {
    return {
      date: purchaseOrder.date.toLocaleDateString(),
      id: purchaseOrder.id,
      vendor: data.name,
    };
  });

  return (
    <>
    <div className="space mt-3 flex h-3/4 overflow-hidden text-neutral-50">
        <h1 className="inline-block text-2xl">
          {" "}
          {`${data.name}`}{" Details"}
        </h1>
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
          pageSize={14}
          autoHeight={true}
          rowsPerPageOptions={[14]}
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
export const getStaticPaths: GetStaticPaths = async () => {
  const vendors = await prisma.vendor.findMany({
    select: {
      id: true,
    },
  });

  const paths = vendors.map((vendor) => ({
    params: { id: vendor.id },
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

  await ssg.vendors.getByIdWithPurchaseOrders.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
