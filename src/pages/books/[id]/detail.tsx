import React from "react";
import { api } from "../../../utils/api";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import { prisma } from "../../../server/db";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../server/api/root";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import superjson from "superjson";
import EditLink from "../../../components/table-components/EditLink";
import DeleteLink from "../../../components/table-components/DeleteLink";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import StripedDataGrid from "../../../components/table-components/StripedDataGrid";

export default function BookDetail(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const bookDetailsQuery = api.books.getByIdWithAllDetails.useQuery({ id });

  // if (router.isFallback) {
  if (bookDetailsQuery.status !== "success") {
    return <div>Loading...</div>;
  }

  const { data } = bookDetailsQuery;

  const bookDetailColumns: GridColDef[] = [
    {
      field: "title",
      headerName: "Book Title",
      headerClassName: "header-theme",
      minWidth: 200,
      // flex: 1,
    },
    {
      field: "author",
      headerName: "Author",
      headerClassName: "header-theme",
      minWidth: 150,
      // flex: 1,
    },
    {
      field: "isbn_13",
      headerName: "ISBN 13",
      headerClassName: "header-theme",
      // flex: 1,
      maxWidth: 125,
    },
    {
      field: "isbn_10",
      headerName: "ISBN 10",
      headerClassName: "header-theme",
      // flex: 1,
      maxWidth: 100,
    },
    {
      field: "publisher",
      headerName: "Publisher",
      headerClassName: "header-theme",
      // flex: 1,
      maxWidth: 200,
    },
    {
      field: "inventoryCount",
      headerName: "Inventory",
      headerClassName: "header-theme",
      // flex: 1,
      maxWidth: 80,
    },
    {
      field: "retailPrice",
      headerName: "Retail Price",
      headerClassName: "header-theme",
      // flex: 1,
      maxWidth: 100,
    },
    {
      field: "genre",
      headerName: "Genre",
      headerClassName: "header-theme",
      // flex: 1,
      maxWidth: 120,
    },
    {
      field: "publicationYear",
      headerName: "Publication Year",
      headerClassName: "header-theme",
      // flex: 1,
      maxWidth: 130,
    },
    {
      field: "pageCount",
      headerName: "Page Count",
      headerClassName: "header-theme",
      // flex: 1,
      maxWidth: 100,
    },
    {
      field: "width",
      headerName: "Width",
      headerClassName: "header-theme",
      // flex: 1,
      maxWidth: 70,
    },
    {
      field: "height",
      headerName: "Height",
      headerClassName: "header-theme",
      // flex: 1,
      maxWidth: 70,
    },
    {
      field: "thickness",
      headerName: "Thickness",
      headerClassName: "header-theme",
      // flex: 1,
      maxWidth: 90,
    },
    {
      field: "shelfSpace",
      headerName: "Shelf Space",
      headerClassName: "header-theme",
      maxWidth: 95,
      // flex: 1,
    },
    {
      field: "lastMonthSales",
      headerName: "Last Month Sales",
      headerClassName: "header-theme",
      maxWidth: 105,
      // flex: 1,
    },
    {
      field: "daysSupply",
      headerName: "Days Supply",
      headerClassName: "header-theme",
      maxWidth: 100,
      // flex: 1,
    },
    {
      field: "bestBuyback",
      headerName: "Best Buyback",
      headerClassName: "header-theme",
      maxWidth: 100,
      // flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      headerClassName: "header-theme",
      // flex: 1,
      maxWidth: 60,
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        <EditLink url={`/books/${id}/edit`} />
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      headerClassName: "header-theme",
      // flex: 1,
      maxWidth: 70,
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        <DeleteLink url={`/books/${id}/delete`} />
      ),
    },
  ];
  // id          			String @id @default(cuid())
  // title       			String
  // authors     			Author[]
  // isbn_13     			String
  // isbn_10                  String?
  //   publisher                String
  // publicationYear          Int
  // pageCount                Int
  // width                    Float
  // height                   Float
  // thickness                Float
  // retailPrice              Float
  // genre                    Genre @relation(fields: [genreId], references: [lineId])
  // genreId                  String // relation String field
  // purchaseLines            PurchaseLine[]
  // salesReconciliationLines SalesLine[]
  // //to Be determined
  // inventoryCount           Int

  const bookWidth =
    data.width === 0 ? "5* in." : `${data.width.toFixed(2)} in.`;
  const bookThickness =
    data.thickness === 0 ? "0.5* in." : `${data.thickness.toFixed(2)} in.`;
  const bookHeight =
    data.height === 0 ? "8* in." : `${data.height.toFixed(2)} in.`;

  const shelfSpace =
    data.thickness === 0
      ? (0.8 * data.inventoryCount).toFixed(2)
      : (data.thickness * data.inventoryCount).toFixed(2);
  let lastMonthSales = 0;
  const today = new Date();
  const thirtyDaysAgo = new Date(new Date().setDate(today.getDate() - 30));
  for (const salesLine of data.salesLines) {
    const salesLineDate = salesLine.salesReconciliation.date;
    if (salesLineDate > thirtyDaysAgo) {
      lastMonthSales += salesLine.quantity;
    }
  }
  const daysSupplyString =
    lastMonthSales === 0
      ? "(inf)"
      : Math.floor((data.inventoryCount / lastMonthSales) * 30).toString();
  let bestBuybackPrice = 0;
  for (const costMostRecentVendor of data.costMostRecentVendor) {
    const currentVendorOffer =
      costMostRecentVendor.vendor.buybackRate *
      costMostRecentVendor.purchaseLine.unitWholesalePrice;
    bestBuybackPrice = Math.max(bestBuybackPrice, currentVendorOffer);
  }
  const shelfSpaceString =
    data.thickness === 0
      ? `${shelfSpace.toString()}* in.`
      : `${shelfSpace.toString()} in.`;
  const bestBuybackString =
    bestBuybackPrice === 0 ? "-" : `$${bestBuybackPrice.toFixed(2)}`;

  const bookDetailRows = [
    {
      id: data.id,
      title: data.title,
      isbn_13: data.isbn_13,
      genre: data.genre.name,
      retailPrice: `$${data.retailPrice.toFixed(2)}`,
      inventoryCount: data.inventoryCount,
      isbn_10: data.isbn_10,
      publisher: data.publisher,
      publicationYear: data.publicationYear,
      pageCount: data.pageCount,
      author: data.authors.map((author) => author.name).join(", "),
      width: bookWidth,
      thickness: bookThickness,
      height: bookHeight,
      shelfSpace: shelfSpaceString,
      lastMonthSales: lastMonthSales.toString(),
      daysSupply: daysSupplyString,
      bestBuyback: bestBuybackString,
    },
  ];

  const salesReconciliationsColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "Sales Reconciliation ID",
      headerClassName: "header-theme",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Reconciliation Date",
      headerClassName: "header-theme",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="text-blue-600">
            {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/}
            <a href={`/sales/${params.id}/detail`}>{params.row.date} </a>
          </div>
        );
      },
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
  ];

  const salesReconciliationsRows = data.salesLines.map((salesLine) => {
    const salesReconciliation = salesLine.salesReconciliation;
    return {
      id: salesReconciliation.id,
      date: salesReconciliation.date.toLocaleDateString(),
      unitWholesalePrice: `$${salesLine.unitWholesalePrice.toFixed(2)}`,
      quantity: salesLine.quantity,
    };
  });

  const purchaseOrderColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "Purchase Order ID",
      headerClassName: "header-theme",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Purchase Date",
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
      field: "vendor",
      headerName: "Vendor",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 250,
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
  ];

  const purchaseOrderRows = data.purchaseLines.map((purchaseLine) => {
    const purchaseOrder = purchaseLine.purchaseOrder;
    return {
      id: purchaseOrder.id,
      date: purchaseOrder.date.toLocaleDateString(),
      vendor: purchaseOrder.vendor.name,
      unitWholesalePrice: `$${purchaseLine.unitWholesalePrice.toFixed(2)}`,
      quantity: purchaseLine.quantity,
    };
  });

  const buybackOrderColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "Buyback ID",
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
      maxWidth: 250,
    },
    {
      field: "unitBuybackPrice",
      headerName: "Unit Buyback Price",
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
  ];

  const buybackOrderRows = data.buybackLines.map((buybackLine) => {
    const buybackOrder = buybackLine.buybackOrder;
    return {
      id: buybackOrder.id,
      date: buybackOrder.date.toLocaleDateString(),
      vendor: buybackOrder.vendor.name,
      unitBuybackPrice: `$${buybackLine.unitBuybackPrice.toFixed(2)}`,
      quantity: buybackLine.quantity,
    };
  });

  return (
    <>
      <Head>
        <title>Book Details</title>
      </Head>
      <div className="space mt-3 flex h-3/4 overflow-hidden text-neutral-50">
        <h1 className="inline-block text-2xl">{"Book Details"}</h1>
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
            rows={bookDetailRows}
            columns={bookDetailColumns}
            components={{
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              Toolbar: GridToolbar,
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
        <div className="text-sm">*: Estimated dimension</div>
        <div className="pt-8 text-lg">Sales Reconciliations</div>
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
            rows={salesReconciliationsRows}
            columns={salesReconciliationsColumns}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
            }}
            components={{
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              Toolbar: GridToolbar,
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
        <div className="pt-8 text-lg">Purchase Orders</div>
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
            rows={purchaseOrderRows}
            columns={purchaseOrderColumns}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
            }}
            components={{
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              Toolbar: GridToolbar,
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
        <div className="pt-8 text-lg">Buybacks</div>
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
            rows={buybackOrderRows}
            columns={buybackOrderColumns}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
            }}
            components={{
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              Toolbar: GridToolbar,
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

export const getStaticPaths: GetStaticPaths = async () => {
  const books = await prisma.book.findMany({
    select: {
      id: true,
    },
  });

  const paths = books.map((book) => ({
    params: { id: book.id },
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

  await ssg.books.getByIdWithAllDetails.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
