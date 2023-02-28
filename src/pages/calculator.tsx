import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { createProxySSGHelpers } from "@trpc/react-query/dist/ssg";
import { appRouter } from "../server/api/root";
import { createInnerTRPCContext } from "../server/api/trpc";
import superjson from "superjson";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import React, { useState } from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import {
  Autocomplete,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { FormControl, FormHelperText, FormLabel } from "@mui/joy";
import Box from "@mui/material/Box";
import StripedDataGrid from "../components/table-components/StripedDataGrid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import EditLink from "../components/table-components/EditLink";
import DeleteLink from "../components/table-components/DeleteLink";

export default function Calculator(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const bookDetailsQuery = api.books.getAll.useQuery({
    cursor: null,
    limit: 100,
  });
  const books = bookDetailsQuery?.data?.items ?? [];

  const [totalSpace, setTotalSpace] = useState(0);
  const [bookSpace, setBookSpace] = useState<number[]>([]);
  const [bookValue, setBookValue] = useState<{
    label: string;
    id: string;
  } | null>(null);
  const [displayType, setDisplayType] = useState<boolean[]>([true]);
  const [bookInputValue, setBookInputValue] = useState("");

  const bookOptions = books.map((book) => ({
    label: book.title,
    id: book.id,
  }));

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Book Name",
      headerClassName: "header-theme",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <FormControl>
            <FormLabel>Book Name</FormLabel>
            <FormHelperText>Select a book by name</FormHelperText>
            <Autocomplete
              options={bookOptions}
              placeholder={"Select a book by name"}
              value={bookValue}
              onChange={(
                event,
                newValue: { label: string; id: string } | null
              ) => {
                setBookValue(newValue);
              }}
              onInputChange={(event, newInputValue: string) => {
                setBookInputValue(newInputValue);
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
          </FormControl>
          // <div className="text-blue-600">
          //   {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/}
          //   <a href={`/vendors/${params.id}/detail`}>{params.row.name} </a>
          // </div>
        );
      },
    },
    {
      field: "displayType",
      headerName: "Display Type",
      headerClassName: "header-theme",
      flex: 1,
      sortable: false,
      filterable: false,
      maxWidth: 150,
    },
    {
      field: "inventoryCount",
      headerName: "Inventory Count",
      headerClassName: "header-theme",
      flex: 1,
      sortable: false,
      filterable: false,
      maxWidth: 200,
      renderCell: (params) => {
        return (
          <div className="text-blue-600">
            {books.find.}
            {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/}
            <a href={`/vendors/${params.id}/detail`}>{params.row.name} </a>
          </div>
        );
      },
    },
    {
      field: "displayCount",
      headerName: "Display Count",
      headerClassName: "header-theme",
      flex: 1,
      sortable: false,
      filterable: false,
      maxWidth: 200,
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
        <DeleteLink url={`/vendors/${params.id}/delete`} />
      ),
    },
  ];

  const rows = vendors.map((vendorWithOverallMetrics) => {
    return {
      id: vendorWithOverallMetrics.vendor.id,
      name: vendorWithOverallMetrics.vendor.name,
      buybackRate: vendorWithOverallMetrics.vendor.buybackRate,
      purchaseOrderCount: vendorWithOverallMetrics.purchaseOrderCount,
    };
  });

  return (
    <div className="inline-block overflow-hidden pt-6">
      <form className="mb-4 items-center rounded bg-white px-6 py-3 shadow-md">
        <div className="mb-4 space-y-5">
          <div className="mb-2 block text-lg font-bold">Shelf Calculator</div>
          <div className="flex justify-center">
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
            {/*<FormControl>*/}
            {/*  <FormLabel id="select-display-type-group">Layout</FormLabel>*/}
            {/*  <RadioGroup*/}
            {/*    aria-labelledby="select-display-type-group"*/}
            {/*    name="display-type-group"*/}
            {/*    value={displayType[0]}*/}
            {/*    onChange={handleChange}*/}
            {/*  >*/}
            {/*    <FormControlLabel*/}
            {/*      value="true"*/}
            {/*      control={<Radio />}*/}
            {/*      label="Spine-out"*/}
            {/*    />*/}
            {/*    <FormControlLabel*/}
            {/*      value="false"*/}
            {/*      control={<Radio />}*/}
            {/*      label="Cover-out"*/}
            {/*    />*/}
            {/*  </RadioGroup>*/}
            {/*</FormControl>*/}
            {/*<div className="text-sm">*/}
            {/*  Inventory Count*/}
            {/*</div>*/}
          </div>
        </div>
      </form>
    </div>
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
  await ssg.books.getAll.prefetch({ cursor: null, limit: 100 });
  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      // id,
    },
  };
}
