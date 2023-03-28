import React, { useState } from "react";
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
import Image from "next/image";
import Modal from "@mui/material/Modal";

export default function BookDetail(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const bookDetailsQuery = api.books.getByIdWithAllDetails.useQuery({ id });

  // if (router.isFallback) {

  const { data } = bookDetailsQuery;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (bookDetailsQuery.status !== "success" || !data) {
    return <div>Loading...</div>;
  }

  const modalStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: "6px",
    boxShadow: 24,
    p: 4,
  };

  const bookDetailColumns: GridColDef[] = [
    {
      field: "image",
      headerName: "Cover",
      headerClassName: "header-theme",

      renderCell: (params) => {
        /* eslint-disable */
        let url = params.row.imgUrl as string;
        let title = params.row.title as string;
        let author = params.row.author as string;
        /* eslint-enable */
        if (!url || url === "") {
          url =
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png";
        }
        return (
          <div className="text-blue-600">
            <Image
              alt={"Book cover"}
              src={url}
              onClick={handleOpen}
              width={120}
              height={180}
            />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="align-items-center" sx={modalStyle}>
                <div className="pb-5 ">
                  <div className="font-bold">{`Cover of ${title}`}</div>
                  <div className="font-light">{`By ${author}`}</div>
                </div>
                <Image alt={"Book cover"} src={url} width={300} height={450} />
              </Box>
            </Modal>
          </div>
        );
      },
    },
    {
      field: "title",
      headerName: "Book Title",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "author",
      headerName: "Author",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      minWidth: 150,
    },
    {
      field: "isbn_13",
      headerName: "ISBN 13",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      minWidth: 125,
    },
    {
      field: "isbn_10",
      headerName: "ISBN 10",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      maxWidth: 100,
    },
    {
      field: "publisher",
      headerName: "Publisher",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      maxWidth: 200,
    },
    {
      field: "inventoryCount",
      headerName: "Inventory",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      maxWidth: 80,
    },
    {
      field: "retailPrice",
      headerName: "Retail Price",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      maxWidth: 100,
    },
    {
      field: "genre",
      headerName: "Genre",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      maxWidth: 120,
    },
    {
      field: "publicationYear",
      headerName: "Pub. Year",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      width: 85,
    },
    {
      field: "pageCount",
      headerName: "Page Count",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      maxWidth: 100,
    },
    {
      field: "width",
      headerName: "Width",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      maxWidth: 70,
    },
    {
      field: "height",
      headerName: "Height",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      maxWidth: 70,
    },
    {
      field: "thickness",
      headerName: "Thickness",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      maxWidth: 90,
    },
    {
      field: "shelfSpace",
      headerName: "Shelf Space",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      maxWidth: 95,
    },
    {
      field: "lastMonthSales",
      headerName: "Last Month Sales",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      minWidth: 130,
    },
    {
      field: "daysSupply",
      headerName: "Days Supply",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      maxWidth: 100,
    },
    {
      field: "bestBuyback",
      headerName: "Best Buyback",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      minWidth: 110,
    },
    {
      field: "relatedBookCount",
      headerName: "Related Book Count",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      minWidth: 150,
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
        <EditLink url={`/books/${id}/edit`} />
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
      imgUrl: data.imgUrl,
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
      relatedBookCount: data.relatedBooks.length.toString(),
    },
  ];

  const salesReconciliationsRows = data.salesLines.map((salesLine) => {
    const salesReconciliation = salesLine.salesReconciliation;
    return {
      id: salesReconciliation.id,
      date: salesReconciliation.date.getTime(),
      user: "N/A",
      recordType: "Sale",
      quantity: salesLine.quantity,
      price: `${salesLine.unitWholesalePrice.toFixed(2)}`,
      vendor: "N/A",
      inventoryTotal: "N/A",
    };
  });

  const purchaseOrderRows = data.purchaseLines.map((purchaseLine) => {
    const purchaseOrder = purchaseLine.purchaseOrder;
    return {
      id: purchaseOrder.id,
      date: purchaseOrder.date.getTime(),
      user: purchaseOrder.user?.name ?? "N/A",
      recordType: "Purchase",
      quantity: purchaseLine.quantity,
      price: `${purchaseLine.unitWholesalePrice.toFixed(2)}`,
      vendor: purchaseOrder.vendor.name,
      inventoryTotal: "N/A",
    };
  });

  const buybackOrderRows = data.buybackLines.map((buybackLine) => {
    const buybackOrder = buybackLine.buybackOrder;
    return {
      id: buybackOrder.id,
      date: buybackOrder.date.getTime(),
      user: buybackOrder.user?.name ?? "N/A",
      recordType: "Buyback",
      quantity: buybackLine.quantity,
      price: `${buybackLine.unitBuybackPrice.toFixed(2)}`,
      vendor: buybackOrder.vendor.name,
      inventoryTotal: "N/A",
    };
  });

  const inventoryCorrectionRows = data.correction.map((inventoryCorrection) => {
    return {
      id: inventoryCorrection.id,
      date: inventoryCorrection.date.getTime(),
      user: inventoryCorrection.user?.name ?? "N/A",
      recordType: "Inventory Correction",
      quantity: inventoryCorrection.quantity,
      price: "0",
      vendor: "N/A",
      inventoryTotal: "N/A",
    };
  });

  const masterRows = [
    ...purchaseOrderRows,
    ...buybackOrderRows,
    ...salesReconciliationsRows,
    ...inventoryCorrectionRows,
  ];

  // Sort the rows by date
  masterRows.sort((a, b) => {
    return a.date - b.date;
  });

  // Add the inventory total to each row
  let inventoryTotal = 0;
  for (const row of masterRows) {
    inventoryTotal +=
      row.recordType === "Purchase" || row.recordType === "Inventory Correction"
        ? row.quantity
        : -row.quantity;
    row.inventoryTotal = inventoryTotal.toString();
  }

  const masterColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "Transaction ID",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      width: 220,
    },
    {
      field: "date",
      headerName: "Date",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      width: 120,
      renderCell: (params) => {
        /* eslint-disable */
        // @ts-ignore
        const urlTag =
          params.row.recordType === "Sale"
            ? "sales"
            : params.row.recordType === "Purchase"
            ? "purchases"
            : params.row.recordType === "Buyback"
            ? "buybacks"
            : "error";
        const date = new Date(params.row.date);

        if (
          urlTag !== "error" ||
          params.row.recordType !== "Inventory Correction"
        ) {
          /* eslint-enable */
          return (
            <div className="text-blue-600">
              {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/}
              <a href={`/${urlTag}/${params.id}/detail`}>
                {date.toLocaleDateString()}{" "}
              </a>
            </div>
          );
        } else {
          return <div>{date.toLocaleDateString()}</div>;
        }
      },
    },
    {
      field: "user",
      headerName: "User",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      width: 210,
    },
    {
      field: "recordType",
      headerName: "Record Type",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      flex: 1,
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
      field: "inventoryTotal",
      headerName: "Inventory Total",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      minWidth: 130,
    },
    {
      field: "price",
      headerName: "Price",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (params.row.recordType === "Inventory Correction") {
          return <div>N/A</div>;
        }
        return (
          <div>
            {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/}
            ${params.row.price}
          </div>
        );
      },
      minWidth: 130,
    },
    {
      field: "vendor",
      headerName: "Vendor",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      width: 210,
    },
  ];

  const relatedBooksRows = data.relatedBooks.map((relatedBook) => {
    return {
      /* eslint-disable */
      id: relatedBook.id,
      title: relatedBook.title,
      author: relatedBook.authors.map((author) => author.name).join(", "),
      publisher: relatedBook.publisher,
      publicationYear: relatedBook.publicationYear,
      isbn_13: relatedBook.isbn_13,
      genre: relatedBook.genre.name,
      pageCount: relatedBook.pageCount,
      /* eslint-enable */
    };
  });

  const relatedBooksCols: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="text-blue-600">
            {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/}
            <a href={`/books/${params.id}/detail`}>{params.row.title} </a>
          </div>
        );
      },
      minWidth: 250,
    },
    {
      field: "author",
      headerName: "Author",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "publisher",
      headerName: "Publisher",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      maxWidth: 200,
    },
    {
      field: "publicationYear",
      headerName: "Pub. Year",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      width: 85,
    },
    {
      field: "isbn_13",
      headerName: "ISBN-13",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      minWidth: 125,
    },
    {
      field: "genre",
      headerName: "Genre",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      minWidth: 100,
    },
    {
      field: "pageCount",
      headerName: "Page Count",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      maxWidth: 100,
    },
  ];

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
            "& .header-theme": {
              backgroundColor: "rgba(56, 116, 203, 0.35)",
            },
            "& .MuiDataGrid-cell--textLeft": {
              textAlign: "left",
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
            pageSize={10}
            rowsPerPageOptions={[10]}
            autoHeight={true}
            getRowHeight={() => "auto"}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            getRowClassName={(params) =>
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
          />
        </Box>
        <div className="text-sm">*: Estimated dimension</div>
        <div className="pt-8 text-lg">Record History</div>
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
            rows={masterRows}
            columns={masterColumns}
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
        <div className="pt-8 text-lg">Related Books</div>
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
            rows={relatedBooksRows}
            columns={relatedBooksCols}
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
    ctx: await createInnerTRPCContext({ session: null }),
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
