import Head from "next/head";
import React from "react";
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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import StripedDataGrid from "../../components/table-components/StripedDataGrid";
import logger from "../../utils/logger";
import EditLink from "../../components/table-components/EditLink";
import Modal from '@mui/material/Modal';

export default function Books(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const booksQuery = api.books.getAllWithDetails.useQuery({
    cursor: null,
    limit: 50,
  });

  const books = booksQuery?.data?.items ?? [];
  //logger.info("Loading books page");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Cover",
      headerClassName: "header-theme",

      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const url = params.row.imgLink as string;
        return (
          <div className="text-blue-600">
            <img src={url} onClick = {handleOpen}style={{ width: 40, height: 60 }}/>
            <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<img src={url} style={{width: 160, height: 240 }}/>
</Modal>
          </div>
        );
      },
    },
    {
      field: "title",
      headerName: "Title",
      headerClassName: "header-theme",
      flex: 1,
      minWidth: 250,
      renderCell: (params) => {
        return (
          <div className="text-blue-600">
            {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/}
            <a href={`/books/${params.id}/detail`}>{params.row.title} </a>
          </div>
        );
      },
    },
    {
      field: "author",
      headerName: "Author",
      headerClassName: "header-theme",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "isbn_13",
      headerName: "ISBN-13",
      headerClassName: "header-theme",
      minWidth: 125,
    },
    {
      field: "retailPrice",
      headerName: "Retail Price",
      headerClassName: "header-theme",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "genre",
      headerName: "Genre",
      headerClassName: "header-theme",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "inventoryCount",
      headerName: "Inventory",
      headerClassName: "header-theme",
      width: 80,
      flex: 1,
    },
    {
      field: "shelfSpace",
      headerName: "Shelf Space",
      headerClassName: "header-theme",
      minWidth: 95,
      flex: 1,
    },
    {
      field: "lastMonthSales",
      headerName: "Monthly Sales",
      headerClassName: "header-theme",
      minWidth: 105,
      flex: 1,
    },
    {
      field: "daysSupply",
      headerName: "Days Supply",
      headerClassName: "header-theme",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "bestBuyback",
      headerName: "Best Buyback",
      headerClassName: "header-theme",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 70,
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        <EditLink url={`/books/${params.id}/edit`} />
      ),
    },
  ];

  const rows = books.map((book) => {
    const bookThickness = book.thickness;
    const shelfSpace =
      bookThickness === 0
        ? (0.8 * book.inventoryCount).toFixed(2)
        : (bookThickness * book.inventoryCount).toFixed(2);
    let lastMonthSales = 0;
    const today = new Date();
    const thirtyDaysAgo = new Date(new Date().setDate(today.getDate() - 30));
    for (const salesLine of book.salesLines) {
      const salesLineDate = salesLine.salesReconciliation.date;
      if (salesLineDate > thirtyDaysAgo) {
        lastMonthSales += salesLine.quantity;
      }
    }
    const daysSupply =
      lastMonthSales === 0
        ? Infinity
        : Math.floor((book.inventoryCount / lastMonthSales) * 30);
    let bestBuybackPrice = 0;
    for (const costMostRecentVendor of book.costMostRecentVendor) {
      const currentVendorOffer =
        costMostRecentVendor.vendor.buybackRate *
        costMostRecentVendor.purchaseLine.unitWholesalePrice;
      bestBuybackPrice = Math.max(bestBuybackPrice, currentVendorOffer);
    }
    const shelfSpaceString =
      bookThickness === 0
        ? `${shelfSpace.toString()}* in.`
        : `${shelfSpace.toString()} in.`;
    const bestBuybackString =
      bestBuybackPrice === 0 ? "-" : `$${bestBuybackPrice.toFixed(2)}`;

    return {
      id: book.id,
      title: book.title,
      author: book.authors.map((author) => author.name).join(", "),
      isbn_13: book.isbn_13,
      retailPrice: `$${book.retailPrice.toFixed(2)}`,
      genre: book.genre.name,
      inventoryCount: book.inventoryCount,
      imgUrl:
        "https://images.pexels.com/photos/1122870/pexels-photo-1122870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      shelfSpace: shelfSpaceString,
      lastMonthSales: lastMonthSales.toString(),
      daysSupply: daysSupply === Infinity ? "(inf)" : daysSupply.toString(),
      bestBuyback: bestBuybackString,
    };
  });

  return (
    <>
      <Head>
        <title>Books</title>
      </Head>
      <div className="space mt-3 flex h-3/4 overflow-hidden text-neutral-50">
        <h1 className="inline-block text-2xl"> Books </h1>
        <Link
          className="ml-2 inline-block text-2xl text-blue-600"
          href="/books/add"
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
        <div className="text-sm">
          {'*: Shelf space from estimated width of 0.8"'}
        </div>
      </div>
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
  await ssg.books.getAllWithDetails.prefetch({
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
