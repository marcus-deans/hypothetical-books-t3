/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { api } from "../../utils/api";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../server/api/root";
import { createInnerTRPCContext } from "../../server/api/trpc";
import superjson from "superjson";
import Link from "next/link";
import type {
  GridCsvExportOptions,
  GridCsvGetRowsToExportParams,
} from "@mui/x-data-grid";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  gridVisibleSortedRowIdsSelector,
  useGridApiContext,
} from "@mui/x-data-grid";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import StripedDataGrid from "../../components/table-components/StripedDataGrid";
import type { ButtonProps } from "@mui/material";
import { Button, createSvgIcon } from "@mui/material";
import * as CSV from "csv-string";
import type {
  CSVBookExport,
  CSVBookExportEntry,
} from "../../schema/exports.schema";
import EditLink from "../../components/table-components/EditLink";
import Image from "next/image";
import DeleteLink from "../../components/table-components/DeleteLink";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useSession } from "next-auth/react";
import type { CustomUser } from "../../schema/user.schema";

export default function Books(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [exportedBooks, setExportedBooks] = useState<string[]>();
  const [calculatedExportValues, setCalculatedExportValues] =
    useState<string[][]>();

  const { data: session, status } = useSession();
  const user = session?.user as CustomUser;

  const booksQuery = api.books.getAllWithDetailsAndSubsidiary.useQuery({
    cursor: null,
    limit: 50,
  });
  const exportQuery = api.books.getManyFromIsbn13WithDetails.useQuery(
    {
      books: exportedBooks,
    },
    { enabled: !!exportedBooks }
  );

  const books = booksQuery?.data?.items ?? [];
  //logger.info("Loading books page");

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Cover",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 60,
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        /* eslint-disable */
        let url = params.row.imgUrl as string;
        /* eslint-enable */
        if (!url || url === "") {
          url =
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png";
        }
        return (
          <div className="text-blue-600">
            <Image alt={"Book cover"} src={url} width={40} height={60} />
          </div>
        );
      },
    },
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
      minWidth: 350,
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
      field: "isbn_13",
      headerName: "ISBN-13",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      minWidth: 125,
    },
    {
      field: "retailPrice",
      headerName: "Retail Price",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      renderCell: (params) => {
        return (
          <div>
            {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/}
            ${params.row.retailPrice}
          </div>
        );
      },
      minWidth: 90,
    },
    {
      field: "remoteRetailPrice",
      headerName: "Remote Price",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      renderCell: (params) => {
        /*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/
        const remotePrice = params.row.remoteRetailPrice === "N/A" ? params.row.remoteRetailPrice : `$${params.row.remoteRetailPrice}`;
        return (
          <div>
            {remotePrice}
          </div>
        );
      },
      width: 90,
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
      field: "inventoryCount",
      headerName: "Inventory",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      width: 80,
    },
    {
      field: "remoteInventoryCount",
      headerName: "Remote Inv.",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      width: 80,
    },
    {
      field: "shelfSpace",
      headerName: "Shelf Space",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      minWidth: 95,
    },
    {
      field: "lastMonthSales",
      headerName: "Monthly Sales",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      minWidth: 110,
    },
    {
      field: "daysSupply",
      headerName: "Days Supply",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      minWidth: 100,
    },
    {
      field: "bestBuyback",
      headerName: "Best Buyback",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      renderCell: (params) => {
        /* eslint-disable */
        const bestBuybackString = params.row.bestBuyback;
        const newString =
          bestBuybackString === "0" ? "-" : `$${bestBuybackString}`;
        /* eslint-enable */
        return <div>{newString}</div>;
      },
      minWidth: 110,
    },
    {
      field: "numRelatedBooks",
      headerName: "# Related Books",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      minWidth: 100,
    },
    {
      field: "edit",
      headerName: "Edit",
      headerClassName: "header-theme",
      width: 60,
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        <EditLink url={`/books/${params.id}/edit`} />
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
        <DeleteLink url={`/books/${params.id}/delete`} />
      ),
    },
  ];

  const rows = books.map((book) => {
    const internalBook = book.internalBook;
    const remoteBook = book.remoteBook;

    const bookThickness = internalBook.thickness;
    let lastMonthSales = 0;
    const today = new Date();
    const thirtyDaysAgo = new Date(new Date().setDate(today.getDate() - 30));
    for (const salesLine of internalBook.salesLines) {
      const salesLineDate = salesLine.salesReconciliation.date;
      if (salesLineDate > thirtyDaysAgo) {
        lastMonthSales += salesLine.quantity;
      }
    }
    const daysSupply =
      lastMonthSales === 0
        ? Infinity
        : Math.floor((internalBook.inventoryCount / lastMonthSales) * 30);
    let bestBuybackPrice = 0;
    for (const costMostRecentVendor of internalBook.costMostRecentVendor) {
      const currentVendorOffer =
        costMostRecentVendor.vendor.buybackRate *
        0.01 *
        costMostRecentVendor.purchaseLine.unitWholesalePrice;
      bestBuybackPrice = Math.max(bestBuybackPrice, currentVendorOffer);
    }

    const bestBuybackString =
      bestBuybackPrice === 0 ? "0" : `${bestBuybackPrice.toFixed(2)}`;

    const shelfSpace = (bookThickness * internalBook.inventoryCount)
      .toFixed(2)
      .toString();

    return {
      id: internalBook.id,
      title: internalBook.title,
      author: internalBook.authors.map((author) => author.name).join(", "),
      isbn_13: internalBook.isbn_13,
      retailPrice: `${internalBook.retailPrice.toFixed(2)}`,
      remoteRetailPrice: remoteBook?.retailPrice ?? "N/A",
      genre: internalBook.genre.name,
      inventoryCount: internalBook.inventoryCount,
      remoteInventoryCount: remoteBook?.inventoryCount ?? "N/A",
      imgUrl: internalBook.imgUrl,
      lastMonthSales: lastMonthSales.toString(),
      daysSupply: daysSupply === Infinity ? "(inf)" : daysSupply.toString(),
      bestBuyback: bestBuybackString,
      shelfSpace: shelfSpace,
      numRelatedBooks: internalBook.relatedBooks.length,
    };
  });

  const getFilteredRows = ({ apiRef }: GridCsvGetRowsToExportParams) =>
    gridVisibleSortedRowIdsSelector(apiRef);

  const ExportIcon = createSvgIcon(
    <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
    "SaveAlt"
  );

  const CustomToolbar = () => {
    const apiRef = useGridApiContext();

    const fetchExportData = (options: GridCsvExportOptions) => {
      const csv = apiRef.current.getDataAsCsv(options);
      console.log(csv);
      const csvSplit = CSV.parse(csv, ",");
      csvSplit.shift();
      const books: string[] = [];
      const calculated: string[][] = [];
      csvSplit.forEach(function (fields) {
        books.push(fields[0] as string);
        const calculatedEntry: string[] = [];
        fields.shift();
        fields.forEach(function (value) {
          calculatedEntry.push(value);
        });
        calculated.push(calculatedEntry);
      });
      console.log(calculated);
      setExportedBooks(books);
      setCalculatedExportValues(calculated);
    };

    const handleExport = () => {
      console.log("Starting Export");
      console.log(exportQuery);
      if (!exportQuery.isSuccess) {
        toast.error("Data Not Fetched");
        return;
      }
      if (exportedBooks === undefined) {
        toast.error("No Books in Export");
        return;
      }
      if (calculatedExportValues === undefined) {
        toast.error("Data not Available on Table for Export");
        return;
      }
      console.log(calculatedExportValues);
      const exportedData: CSVBookExport = {
        headers: [
          "title",
          "authors",
          "isbn_13",
          "isbn_10",
          "publisher",
          "publication_year",
          "page_count",
          "height",
          "width",
          "thickness",
          "retail_price",
          "genre",
          "inventory_count",
          "last_month_sales",
          "days_of_supply",
          "best_buyback_price",
          "num_related_books",
        ],
        data: [],
      };
      if (exportQuery.data.length !== calculatedExportValues?.length) {
        toast.error("Backend Error in Database");
        return;
      }
      exportQuery.data.forEach(function (book, index) {
        const entry: CSVBookExportEntry = {
          title: book.title ? book.title : "",
          authors: book.authors ? book.authors.join("|") : "",
          isbn_13: book.isbn_13 ? book.isbn_13 : "",
          isbn_10: book.isbn_10 ? book.isbn_10 : "",
          publisher: book.publisher ? book.publisher : "",
          publication_year: book.publication_year
            ? book.publication_year.toString()
            : "",
          page_count: book.page_count ? book.page_count.toString() : "",
          height: book.height ? book.height.toString() : "",
          width: book.width ? book.width.toString() : "",
          thickness: book.thickness ? book.thickness.toString() : "",
          retail_price: book.retail_price ? book.retail_price.toString() : "0",
          genre: book.genre ? book.genre : "",
          inventory_count:
            book.inventory_count != null
              ? book.inventory_count.toString()
              : "0",
          shelf_space_inches: "0",
          last_month_sales: "0",
          days_of_supply: "(inf)",
          best_buyback_price: "0",
          num_related_books: "0",
        };
        if (calculatedExportValues.at(index) !== undefined) {
          const calculatedEntry = calculatedExportValues.at(index) ?? [];
          entry.last_month_sales = calculatedEntry.at(0) ?? "0";
          console.log("last_month_sales: " + entry.last_month_sales);
          entry.days_of_supply = calculatedEntry.at(1) ?? "0";
          entry.best_buyback_price = calculatedEntry.at(2) ?? "0";
          entry.num_related_books = calculatedEntry.at(3) ?? "0";
        }
        exportedData.data.push(entry);
      });
      console.log(exportedData);

      const header = [
        { id: "title", title: "title" },
        { id: "authors", title: "authors" },
        { id: "isbn_13", title: "isbn_13" },
        { id: "isbn_10", title: "isbn_10" },
        { id: "publisher", title: "publisher" },
        { id: "publication_year", title: "publication_year" },
        { id: "page_count", title: "page_count" },
        { id: "height", title: "height" },
        { id: "width", title: "width" },
        { id: "thickness", title: "thickness" },
        { id: "retail_price", title: "retail_price" },
        { id: "genre", title: "genre" },
        { id: "inventory_count", title: "inventory_count" },
        { id: "last_month_sales", title: "last_month_sales" },
        { id: "days_of_supply", title: "days_of_supply" },
        { id: "best_buyback_price", title: "best_buyback_price" },
        { id: "num_related_books", title: "num_related_books" },
      ];

      const csvRows: string[][] = [];

      csvRows.push(exportedData.headers);
      exportedData.data.forEach(function (value) {
        const lineArray: string[] = [];
        lineArray.push(value.title.replace(",", " -"));
        lineArray.push(value.authors.replace(",", " -"));
        lineArray.push(value.isbn_13.replace(",", " -"));
        lineArray.push(value.isbn_10.replace(",", " -"));
        lineArray.push(value.publisher.replace(",", " -"));
        lineArray.push(value.publication_year);
        lineArray.push(value.page_count);
        lineArray.push(value.height);
        lineArray.push(value.width);
        lineArray.push(value.thickness);
        lineArray.push(value.retail_price);
        lineArray.push(value.genre.replace(",", " -"));
        lineArray.push(value.inventory_count);
        lineArray.push(value.last_month_sales);
        lineArray.push(value.days_of_supply);
        lineArray.push(value.best_buyback_price);
        lineArray.push(value.num_related_books);
        csvRows.push(lineArray);
      });

      const csvData: string = csvRows.join("\n");

      const blob = new Blob([csvData], { type: "text/csv;encoding:utf-8" });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.setAttribute("href", url);
      a.setAttribute("download", "download.csv");
      a.click();
    };

    const buttonBaseProps: ButtonProps = {
      color: "primary",
      size: "small",
      startIcon: <ExportIcon />,
    };
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <Button
          {...buttonBaseProps}
          onClick={() =>
            fetchExportData({
              getRowsToExport: getFilteredRows,
              fields: [
                "isbn_13",
                "lastMonthSales",
                "daysSupply",
                "bestBuyback",
                "numRelatedBooks",
              ],
              delimiter: ",",
            })
          }
        >
          Prepare CSV
        </Button>
        <Button
          onClick={() => {
            handleExport();
          }}
          disabled={!exportQuery.isSuccess}
        >
          Confirm CSV Export
        </Button>
      </GridToolbarContainer>
    );
  };

  return (
    <>
      <Head>
        <title>Books</title>
      </Head>
      {user?.role === "admin" ? (
        <div className="space flex h-3/4 overflow-hidden text-neutral-50">
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              my: 1.5,
            }}
          >
            <h1 className="inline-block text-2xl"> Books </h1>
            <Fab
              size="small"
              aria-label="add"
              href="/books/add"
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
      ) : (
        <div className="space mt-3 mb-5 flex h-3/4 overflow-hidden text-neutral-50">
          <h1 className="inline-block text-2xl"> Books </h1>
        </div>
      )}
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
              Toolbar: CustomToolbar,
            }}
            autoHeight={true}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowHeight={() => "auto"}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            getRowClassName={(params) =>
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
          />
        </Box>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
}
// id: string;
// title: string;
// authors: string[];
// isbn_13: string;
// retailPrice: number;
// genre: string;
// inventoryCount: number;
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
  await ssg.books.getAllWithDetailsAndSubsidiary.prefetch({
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
