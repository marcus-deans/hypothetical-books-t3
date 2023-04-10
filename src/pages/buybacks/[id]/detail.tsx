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
import { longFormatter } from "../../../utils/formatters";

export default function BuybackOrderDetail(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const buybackOrderDetailsQuery =
    api.buybackOrders.getByIdWithOverallMetrics.useQuery({ id });

  // if (router.isFallback) {
  if (buybackOrderDetailsQuery.status !== "success") {
    return <div className="text-white">Loading...</div>;
  }

  const { data } = buybackOrderDetailsQuery;

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Book Title",
      headerClassName: "header-theme",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="text-blue-600">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions */}
            <a href={`/books/${params.row.bookId}/detail`}>
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
              {params.row.title}{" "}
            </a>
          </div>
        );
      },
    },
    {
      field: "isbn_13",
      headerName: "ISBN 13",
      headerClassName: "header-theme",
      minWidth: 130,
    },
    {
      field: "unitBuybackPrice",
      headerName: "Unit Buyback Price",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      renderCell: (params) => {
        return (
          <div>
            {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/}
            ${params.row.unitBuybackPrice}
          </div>
        );
      },
      minWidth: 150,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      minWidth: 80,
    },
    {
      field: "subtotal",
      headerName: "Subtotal",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      renderCell: (params) => {
        return (
          <div>
            {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/}
            ${params.row.subtotal}
          </div>
        );
      },
      minWidth: 80,
    },
    {
      field: "edit",
      headerName: "Edit",
      headerClassName: "header-theme",
      maxWidth: 60,
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        <EditLink url={`/buybacks/${id}/${params.id}/edit`} />
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      headerClassName: "header-theme",
      maxWidth: 70,
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        <DeleteLink url={`/buybacks/${id}/${params.id}/delete`} />
      ),
    },
  ];
  const rows = data.buybackOrderWithOverallMetrics.buybackLines.map(
    (buybackLine) => {
      return {
        id: buybackLine.id,
        bookId: buybackLine.book.id,
        title: buybackLine.book.title,
        isbn_13: buybackLine.book.isbn_13,
        unitBuybackPrice: `${buybackLine.unitBuybackPrice.toFixed(2)}`,
        quantity: buybackLine.quantity,
        subtotal: `${(
          buybackLine.unitBuybackPrice * buybackLine.quantity
        ).toFixed(2)}`,
      };
    }
  );

  return (
    <>
      <Head>
        <title>Buyback Details</title>
      </Head>
      <div className="space mt-3 flex h-3/4 overflow-hidden text-neutral-50">
        <h1 className="inline-block text-2xl">
          {" "}
          {`Buy Back Order on ${longFormatter.format(
            data.buybackOrderWithOverallMetrics.date
          )}`}{" "}
        </h1>
      </div>
      <div className="space flex pt-3">
        <Link className="items-end pr-3" href={`/buybacks/${id}/add`} passHref>
          <Button
            className="rounded border border-blue-700 bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
            variant="contained"
          >
            Add Buyback Line
          </Button>
        </Link>
        <Link className="items-end px-3" href={`/buybacks/${id}/edit`} passHref>
          <Button
            className="rounded border border-blue-700 bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
            variant="contained"
          >
            Edit Buyback Order
          </Button>
        </Link>
        <Link
          className="items-end px-3"
          href={`/buybacks/${id}/delete`}
          passHref
        >
          <Button
            className="rounded border border-blue-700 bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
            variant="contained"
          >
            Delete Buyback Order
          </Button>
        </Link>
        <Link
          className="items-end px-3"
          href={`/buybacks/${id}/import`}
          passHref
        >
          <Button
            className="rounded border border-blue-700 bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
            variant="contained"
          >
            Import CSV
          </Button>
        </Link>
      </div>
      <div className="mt-5 h-3/4 overflow-hidden rounded-t-lg border border-gray-200 bg-white shadow-md">
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
      <div className="flex space-x-5 rounded-b-lg bg-white px-3 py-3">
        <div className="text-large px-15 ">
          {`Grand Total: $${data.totalPrice.toFixed(2)}`}
        </div>
        <div className="text-large px-15 ">{`Vendor Name: ${data.buybackOrderWithOverallMetrics.vendor.name}`}</div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const buybackOrders = await prisma.buybackOrder.findMany({
    select: {
      id: true,
    },
  });

  const paths = buybackOrders.map((buybackOrder) => ({
    params: { id: buybackOrder.id },
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

  await ssg.buybackOrders.getByIdWithOverallMetrics.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
