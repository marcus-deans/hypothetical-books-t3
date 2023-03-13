

import { GridColDef } from "@mui/x-data-grid";
import { InferGetServerSidePropsType } from "next"
import Head from "next/head";
import { getServerSideProps } from "../report"

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
      maxWidth: 80,
    },
{
    field: "width",
    headerName: "Width",
    headerClassName: "header-theme",
    maxWidth: 70,
  },
  {
    field: "height",
    headerName: "Height",
    headerClassName: "header-theme",
    maxWidth: 70,
  },
  {
    field: "thickness",
    headerName: "Thickness",
    headerClassName: "header-theme",
    maxWidth: 90,
  },    
  {
    field: "shelfSpace",
    headerName: "Shelf Space",
    headerClassName: "header-theme",
    maxWidth: 95,
  },
 { field: "displayStyle",
  headerName: "Display Style",
  headerClassName: "header-theme",
  maxWidth: 95,}
  ]

  return(
    <>
    <Head>
      <title>Shelf Calculator</title>
    </Head>
    <div></div>
    </>
  )
}

