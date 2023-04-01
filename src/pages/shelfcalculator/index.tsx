import type {
  GridColDef,
  GridPreProcessEditCellProps,
  GridRowModel,
} from "@mui/x-data-grid";
import type { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import type { getServerSideProps } from "../report";
import StripedDataGrid from "../../components/table-components/StripedDataGrid";
import Box from "@mui/material/Box";
import { api } from "../../utils/api";

import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";


export default function Calculator(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      headerClassName: "header-theme",
      flex: 1,
      align: "left",
      renderCell: (params) => {
        /* eslint-disable */
        const bookId = params.row.internalId as string;
        const bookTitle = params.row.title as string;
        /* eslint-enable */
        return (
          <div className="text-blue-600">
            <a href={`/books/${bookId}/detail`}>{bookTitle} </a>
          </div>
        );
      },
    },
    {
      field: "inventoryCount",
      headerName: "Inventory",
      headerClassName: "header-theme",
      flex: 1,
    },
    {
      field: "displayCount",
      headerName: "Display Count",
      headerClassName: "header-theme",
      flex: 1,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError =
          isNaN(Number(params.props.value)) || Number(params.props.value) < 0;
        return { ...params.props, error: hasError };
      },
    },
    {
      field: "width",
      headerName: "Width",
      headerClassName: "header-theme",
      flex: 1,
    },
    {
      field: "height",
      headerName: "Height",
      headerClassName: "header-theme",
      flex: 1,
    },
    {
      field: "thickness",
      headerName: "Thickness",
      headerClassName: "header-theme",
      flex: 1,
    },
    {
      field: "displayStyle",
      headerName: "Display Style",
      headerClassName: "header-theme",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Spine Out", "Cover Out"],
    },
    {
      field: "shelfSpace",
      headerName: "Shelf Space",
      headerClassName: "header-theme",
      flex: 1,
    },
  ];

  interface BookCalcDetails {
    id: string;
    internalId: string;
    title: string;
    inventoryCount: number;
    displayCount: number;
    width: number;
    height: number;
    thickness: number;
    displayStyle: string;
    shelfSpace: string;
    usedDefault: boolean;
  }

  const [bookValue, setBookValue] = useState<{
    label: string;
    id: string;
  } | null>(null);
  const [bookInputValue, setBookInputValue] = useState("");
  const [displayedBooks, setDisplayedBooks] = useState<BookCalcDetails[]>([]);
  const [totalSpaceSum, setTotalSpaceSum] = useState(0);

  const booksQuery = api.books.getAll.useQuery({ cursor: null, limit: 100 });
  const books = booksQuery?.data?.items ?? [];
  const bookOptions = books.map((book) => ({
    label: `${book.title} (${book.isbn_13})`,
    id: book.id,
  }));

  const rows = displayedBooks;

  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    const newDisplayedBooks = displayedBooks.map((displayedBook, index) => {
      const oldId = (oldRow as BookCalcDetails).id;
      if (displayedBook.id === oldId) {
        const newSpace = calcShelfSpace(
          Number(newRow.width),
          Number(newRow.height),
          Number(newRow.thickness),
          String(newRow.displayStyle),
          Number(newRow.displayCount)
        );
        const spaceVal = newSpace.toFixed(2).toString();
        newRow.shelfSpace = newRow.usedDefault ? spaceVal + "*" : spaceVal;
        let thickness = newRow.thickness;
        if(thickness == 0){
          thickness = 0.8;
        }
        //Case of old count now violating new cover out config
        if(newRow.displayStyle == "Cover Out" && thickness * newRow.displayCount > 9 ){
          newRow.displayCount = Math.floor(9/thickness)
          console.log("set")

        }
        return newRow as BookCalcDetails;
        //Recalculate the shelf space
      } else {
        // The rest haven't changed
        return displayedBook;
      }
    });
    setDisplayedBooks(newDisplayedBooks);
    const newSpace =
      totalSpaceSum -
      parseSpace(String(oldRow.shelfSpace)) +
      parseSpace(String(newRow.shelfSpace));
    setTotalSpaceSum(newSpace);
    return newRow;
  };

  const parseSpace = (shelfSpaceStr: string): number => {
    return parseFloat(shelfSpaceStr);
  };
  const handleProcessRowUpdateError = (error: Error) => {
    toast.error(error.message);
  };

  const handleSubmit = () => {
    //Add book value to the rows
    //Clear the autocomplete bar to add the next book
    if (bookValue) {
      //use query to get the book we just searched
      const specificBook = books.find((item) => item.id === bookValue.id);
      if (specificBook) {
        const displayBook: BookCalcDetails = {
          id: uuidv4(),
          internalId: specificBook.id,
          title: specificBook.title,
          inventoryCount: specificBook.inventoryCount,
          displayCount: specificBook.inventoryCount,
          width: specificBook.width,
          height: specificBook.height,
          thickness: specificBook.thickness,
          displayStyle: "Spine Out",
          shelfSpace: "",
          usedDefault: false,
        };
        displayBook.shelfSpace = calcShelfSpace(
          displayBook.width,
          displayBook.height,
          displayBook.thickness,
          displayBook.displayStyle,
          displayBook.displayCount
        ).toString();
        if (
          specificBook.width == 0 ||
          specificBook.height == 0 ||
          specificBook.thickness == 0
        ) {
          displayBook.usedDefault = true;
        }
        setDisplayedBooks((prev) => [...prev, displayBook]);
        setTotalSpaceSum(totalSpaceSum + parseFloat(displayBook.shelfSpace));
        const spaceVal = Number.parseFloat(displayBook.shelfSpace)
          .toFixed(2)
          .toString();
        displayBook.shelfSpace = displayBook.usedDefault
          ? spaceVal + "*"
          : spaceVal;

        toast.success("Added " + specificBook.title);
      }
    }
    setBookInputValue("");
    setBookValue(null);
  };

  const calcShelfSpace = (
    width: number,
    height: number,
    thickness: number,
    displayStyle: string,
    displayCount: number
  ) => {
    if (displayStyle === "Spine Out") {
      if (thickness === 0) {
        thickness = 0.8;
      }
      return Number(thickness * displayCount);
    }
    if (displayStyle === "Cover Out") {
      if (displayCount == 0) {
        return 0;
      }
      if (width == 0) {
        width = 6;
      }
      return Number(width);
    } else {
      return Number(0);
    }
  };

  return (
    <>
      <Head>
        <title>Shelf Calculator</title>
      </Head>
      <div className="pt-6"></div>
      <div className="rounded-lg bg-white pt-3">
        <div className="mb-2 block text-lg font-bold text-gray-700">
          Shelf Calculator
        </div>
        <Autocomplete
          options={bookOptions}
          value={bookValue}
          onChange={(event, newValue: { label: string; id: string } | null) => {
            setBookValue(newValue);
          }}
          onInputChange={(event, newBookInputValue: string) => {
            setBookInputValue(newBookInputValue);
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ width: 425 }}
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
              }}
              label="Search books by title"
            />
          )}
        />
        <div className="pt-3" />
        <button
          className="space focus:shadow-outline flex rounded bg-blue-500 py-2 px-4 align-middle font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="button"
          id="button-addon2"
          onClick={handleSubmit}
        >
          Add Book
        </button>
        <div className="mt-3 h-3/4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
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
              editMode="row"
              columns={columns}
              autoHeight={true}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowHeight={() => "auto"}
              disableSelectionOnClick
              processRowUpdate={processRowUpdate}
              onProcessRowUpdateError={handleProcessRowUpdateError}
              experimentalFeatures={{ newEditingApi: true }}
              getRowClassName={(params) =>
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
              }
            />
          </Box>
          <div className="pt-1 text-lg">
            {`Total Shelf Space: ${totalSpaceSum.toFixed(2)} inches`}
          </div>
          <div className="pb-1 text-sm">
            {
              "*: Shelf space from estimated width of 0.8, height of 8, or width of 6 for zero-valued parameters"
            }
          </div>
        </div>
      </div>

      <ToastContainer></ToastContainer>
    </>
  );
}
