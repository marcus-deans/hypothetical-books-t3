

import { GridColDef } from "@mui/x-data-grid";
import { InferGetServerSidePropsType } from "next"
import Head from "next/head";
import { getServerSideProps } from "../report"
import StripedDataGrid from "../../components/table-components/StripedDataGrid";
import  Box  from "@mui/material/Box";
import { api } from "../../utils/api";

import { Autocomplete, TextField } from "@mui/material";
import books from "../books";
import { useState } from "react";

// const shelfSpace =
//     data.thickness === 0
//       ? (0.8 * data.inventoryCount).toFixed(2)
//       : (data.thickness * data.inventoryCount).toFixed(2);

// const shelfSpaceString =
// data.thickness === 0
//   ? `${shelfSpace.toString()}* in.`
//   : `${shelfSpace.toString()} in.`;

// const bookDetailRows = [
//     {
//       imgUrl: data.imgUrl,
//       id: data.id,
//       title: data.title,
//       isbn_13: data.isbn_13,
//       genre: data.genre.name,
//       retailPrice: `$${data.retailPrice.toFixed(2)}`,
//       inventoryCount: data.inventoryCount,
//       isbn_10: data.isbn_10,
//       publisher: data.publisher,
//       publicationYear: data.publicationYear,
//       pageCount: data.pageCount,
//       author: data.authors.map((author) => author.name).join(", "),
//       width: bookWidth,
//       thickness: bookThickness,
//       height: bookHeight,
//       shelfSpace: shelfSpaceString,
//       lastMonthSales: lastMonthSales.toString(),
//       daysSupply: daysSupplyString,
//       bestBuyback: bestBuybackString,
//     },
//   ];


export default function calculator(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
){
  const columns: GridColDef[] = [
    {
      field: "inventoryCount",
      headerName: "Inventory",
      headerClassName: "header-theme",
      flex:1,
    },
{
    field: "width",
    headerName: "Width",
    headerClassName: "header-theme",
    flex:1,
  },
  {
    field: "height",
    headerName: "Height",
    headerClassName: "header-theme",
    flex:1,
  },
  {
    field: "thickness",
    headerName: "Thickness",
    headerClassName: "header-theme",
    flex:1,
  },    
 { field: "displayStyle",
  headerName: "Display Style",
  headerClassName: "header-theme",
  flex:1,},
  {
    field: "shelfSpace",
    headerName: "Shelf Space",
    headerClassName: "header-theme",
    flex:1,
  },
  ]
  const [bookValue, setBookValue] = useState<{
    label: string;
    id: string;
  } | null>(null);
  const [bookInputValue, setBookInputValue] = useState("");

  const booksQuery = api.books.getAll.useQuery({ cursor: null, limit: 100 });
  const books = booksQuery?.data?.items ?? [];

  const bookOptions = books.map((book) => ({
    label: `${book.title} (${book.isbn_13})`,
    id: book.id,
  }));

  const handleSubmit = () => {

  };

  // const rows = books.map((book) => {
  //   const bookThickness = book.thickness;
  //   let lastMonthSales = 0;
  //   const today = new Date();
  //   const thirtyDaysAgo = new Date(new Date().setDate(today.getDate() - 30));
  //   for (const salesLine of book.salesLines) {
  //     const salesLineDate = salesLine.salesReconciliation.date;
  //     if (salesLineDate > thirtyDaysAgo) {
  //       lastMonthSales += salesLine.quantity;
  //     }
  //   }
  //   const daysSupply =
  //     lastMonthSales === 0
  //       ? Infinity
  //       : Math.floor((book.inventoryCount / lastMonthSales) * 30);
  //   let bestBuybackPrice = 0;
  //   for (const costMostRecentVendor of book.costMostRecentVendor) {
  //     const currentVendorOffer =
  //       costMostRecentVendor.vendor.buybackRate *
  //       0.01 *
  //       costMostRecentVendor.purchaseLine.unitWholesalePrice;
  //     bestBuybackPrice = Math.max(bestBuybackPrice, currentVendorOffer);
  //   }

  //   const bestBuybackString =
  //     bestBuybackPrice === 0 ? "0" : `${bestBuybackPrice.toFixed(2)}`;

  //   return {
  //     id: book.id,
  //     title: book.title,
  //     author: book.authors.map((author) => author.name).join(", "),
  //     isbn_13: book.isbn_13,
  //     retailPrice: `${book.retailPrice.toFixed(2)}`,
  //     genre: book.genre.name,
  //     inventoryCount: book.inventoryCount,
  //     imgUrl: book.imgUrl,
  //     lastMonthSales: lastMonthSales.toString(),
  //     daysSupply: daysSupply === Infinity ? "(inf)" : daysSupply.toString(),
  //     bestBuyback: bestBuybackString,
  //   };
  // });
  return(
    <>
    <Head>
      <title>Shelf Calculator</title>
    </Head>
    <div className="rounded-lg bg-white px-6 pt-6">
     <Autocomplete
                      options={bookOptions}
                      placeholder={"Search books by title"}
                      value={bookValue}
                      onChange={(
                        event,
                        newValue: { label: string; id: string } | null
                      ) => {
                        setBookValue(newValue);
                      }}
                      onInputChange={(event, newBookInputValue: string) => {
                        setBookInputValue(newBookInputValue);
                      }}
                      sx={{ width: 425 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          inputProps={{
                            ...params.inputProps,
                          }}
                        />
                      )}
                    />                
                    <button
                    className="btn inline-block flex items-center rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition  duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                    type="button"
                    id="button-addon2"
                    onClick={handleSubmit}>Add Book </button>
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
            rows={[]}
            columns={columns}
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
        <div className="text-sm">
          {'*: Shelf space from estimated width of 0.8"'}
        </div>
      </div>
      </div>
    </>
  )
}

