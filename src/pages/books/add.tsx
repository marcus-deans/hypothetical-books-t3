import Head from "next/head";
import React, { useState } from "react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import type {
  GridColDef,
  GridPreProcessEditCellProps,
  GridRowModel,
} from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import StripedDataGrid from "../../components/table-components/StripedDataGrid";
import Box from "@mui/material/Box";
import Image from "next/image";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

interface GoogleBookResponse {
  kind: string;
  totalItems: number;
  items: GoogleBookItems[];
}

interface GoogleBookItems {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: GoogleBookDetails;
}

interface GoogleBookDetails {
  title: string;
  authors: string[];
  publishedDate: string;
  description: string | null;
  industryIdentifiers: {
    type: string;
    identifier: string;
  }[];

  pageCount: number;

  publisher: string | null;
  categories: string[] | null;
  imageLinks: {
    smallThumbnail: string | null;
    thumbnail: string | null;
    small: string | null;
    medium: string | null;
    large: string | null;
  };
}
interface BookDetails {
  id: number;
  imgUrl: string;
  title: string;
  authors: string;
  isbn_13: string;
  isbn_10: string;
  publicationYear: number;
  pageCount: number;
  publisher: string;
  genre: string;
  width: number;
  height: number;
  thickness: number;
  retailPrice: number;
}

export default function AddBook() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayedBooks, setDisplayedBooks] = useState<BookDetails[]>([]);

  const [parsedIsbns, setParsedIsbns] = useState<string[]>([]);
  const retrieveDetailsQuery = api.googleBooks.retrieveByISBNs.useQuery(
    { isbns: parsedIsbns },
    { enabled: !!parsedIsbns }
  );
  const retrievePricingQuery = api.googleBooks.retrievePricingData.useQuery(
    { isbns: parsedIsbns },
    { enabled: !!parsedIsbns }
  );

  const [currentTitle, setCurrentTitle] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");
  const findRelatedBooksQuery = api.books.findRelatedBooks.useQuery(
    { title: currentTitle, author: currentAuthor },
    { enabled: !!currentTitle && !!currentAuthor }
  );
  type relatedBookReturnType = typeof findRelatedBooksQuery.data;

  const addMutation = api.books.add.useMutation();
  const router = useRouter();
  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const performQuery = () => {
    const googleBooksData = retrieveDetailsQuery?.data ?? [];
    const pricingData = retrievePricingQuery?.data ?? [];
    if (googleBooksData) {
      console.log("Setting retreived books with:");
      console.log(googleBooksData);
      googleBooksData.map((retrievedBook, index) => {
        console.log("Adding retrieved book to rows");
        console.log(retrievedBook);
        let isbn_10 = null;
        let isbn_13 = null;
        if (retrievedBook?.industryIdentifiers[0]?.type === "ISBN_13") {
          isbn_13 = retrievedBook.industryIdentifiers[0].identifier;
          if (retrievedBook?.industryIdentifiers[1]?.type === "ISBN_10") {
            isbn_10 = retrievedBook.industryIdentifiers[1].identifier;
          }
        }
        if (retrievedBook?.industryIdentifiers[1]?.type === "ISBN_13") {
          isbn_13 = retrievedBook.industryIdentifiers[1].identifier;
          if (retrievedBook?.industryIdentifiers[0]?.type === "ISBN_10") {
            isbn_10 = retrievedBook.industryIdentifiers[0].identifier;
          }
        }
        let retailPrice = 0;
        if (pricingData[index] !== undefined) {
          retailPrice = isNaN(Number(pricingData[index]))
            ? 0
            : Number(pricingData[index]);
        }

        setCurrentTitle(retrievedBook.title);
        setCurrentAuthor(retrievedBook.authors.join(", "));
        const relatedBooks = findRelatedBooksQuery?.data ?? [];
        console.log("Related books:");
        console.log(relatedBooks);

        const displayBook = {
          imgUrl: retrievedBook.imageLinks?.thumbnail ?? "",
          id: index,
          title: retrievedBook.title,
          authors: retrievedBook.authors.join(", "),
          isbn_13: isbn_13 ?? "Unknown",
          isbn_10: isbn_10 ?? "Unknown",
          publicationYear: new Date(retrievedBook.publishedDate).getFullYear(),
          pageCount: isNaN(retrievedBook.pageCount)
            ? 0
            : retrievedBook.pageCount,
          publisher: retrievedBook.publisher ?? "Unknown",
          genre: retrievedBook?.categories?.join(", ") ?? "Unknown",
          width: 0,
          height: 0,
          thickness: 0,
          retailPrice: retailPrice,
          relatedBooks: relatedBooks,
        };
        setDisplayedBooks((prev) => [...prev, displayBook]);
        setCurrentTitle("");
        setCurrentAuthor("");
      });
      setIsLoaded(true);
    }
  };

  const handleSearch = () => {
    if (searchQuery === "") {
      return;
    }
    setIsLoaded(false);
    setDisplayedBooks([]);
    // 9781250158079, 9781101904954, 9780393072235
    const isbnSearchList = searchQuery.replace(/-/g, "").split(/[\s,;\t\n]+/g);
    setParsedIsbns(isbnSearchList);
    performQuery();
    // setSearchQuery("");
  };

  const handleConfirm = () => {
    try {
      rows.map((row) => {
        console.log("dding book");
        console.log(row);
        addMutation.mutate({
          title: row.title,
          authors: row.authors.split(","),
          isbn_13: row.isbn_13,
          isbn_10: row.isbn_10,
          publisher: row.publisher,
          publicationYear: row.publicationYear,
          pageCount: row.pageCount,
          width: row.width,
          height: row.height,
          thickness: row.thickness,
          retailPrice: row.retailPrice,
          genreName: row.genre,
          imgUrl: row.imgUrl,
          purchaseLines: [],
          salesLines: [],
          inventoryCount: 0,
          relatedBooks: [], //TODO: implement properly
        });
      });
      setTimeout(() => {
        void router.push("/books");
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const modalStyle = {
    position: "absolute" as "absolute",
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: "paper",
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Cover",
      headerClassName: "header-theme",
      width: 60,
      align: "center",
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
      headerName: "Book Title",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "authors",
      headerName: "Authors",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "isbn_13",
      headerName: "ISBN-13",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      width: 125,
    },
    {
      field: "isbn_10",
      headerName: "ISBN-10",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      width: 110,
    },
    {
      field: "retailPrice",
      headerName: "Retail Price ($)",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      maxWidth: 70,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError =
          isNaN(Number(params.props.value)) || Number(params.props.value) < 0;
        return { ...params.props, error: hasError };
      },
      editable: true,
    },
    {
      field: "pageCount",
      headerName: "Page Count",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "publisher",
      headerName: "Publisher",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      minWidth: 150,
    },
    {
      field: "genre",
      headerName: "Genre",
      type: "string",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      editable: true,
      minWidth: 150,
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
      field: "width",
      headerName: "Width (in.)",
      headerClassName: "header-theme",
      type: "number",
      align: "left",
      headerAlign: "left",
      width: 90,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError =
          isNaN(Number(params.props.value)) || Number(params.props.value) < 0;
        return { ...params.props, error: hasError };
      },
      editable: true,
    },
    {
      field: "height",
      headerName: "Height (in.)",
      type: "number",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      width: 90,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError =
          isNaN(Number(params.props.value)) || Number(params.props.value) < 0;
        return { ...params.props, error: hasError };
      },
      editable: true,
    },
    {
      field: "thickness",
      headerName: "Thickness (in.)",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      width: 120,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError =
          isNaN(Number(params.props.value)) || Number(params.props.value) < 0;
        return { ...params.props, error: hasError };
      },
      editable: true,
    },
    {
      field: "relatedBooks",
      headerName: "Related Books",
      headerClassName: "header-theme",
      minWidth: 200,
      renderCell: (params) => {
        /* eslint-disable */
        let relatedBooks = params.row.relatedBooks as relatedBookReturnType;
        console.log(relatedBooks);
        if (relatedBooks!.length === 0) {
          return (
          <div>
            No Related Books Found!
          </div>
          );
        }
        /* eslint-enable */
        return (
          <div>
            <button
              type="button"
              onClick={handleOpen}
            >
              See Related Books
            </button>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Related Books for: {params.row.title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {relatedBooks!
                    .map((relatedBook) => relatedBook.item.title)
                    .join(",\n")}
                </Typography>
              </Box>
            </Modal>
          </div>
        );
      },
    },
  ];

  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    console.log("New row: ", newRow);
    const newDisplayedBooks = displayedBooks.map((displayedBook, index) => {
      if (index === newRow.id) {
        // Increment the clicked counter
        return newRow as BookDetails;
      } else {
        // The rest haven't changed
        return displayedBook;
      }
    });
    console.log("New displayed books: ", newDisplayedBooks);
    setDisplayedBooks(newDisplayedBooks);
    return newRow;
  };

  const handleProcessRowUpdateError = (error: Error) => {
    toast.error(error.message);
  };

  const rows = displayedBooks;

  // 9780812979688, 9781250158079
  if (isLoaded) {
    console.log("all rows");
    console.log(rows);
    return (
      <>
        <Head>
          <title>Add Book</title>
        </Head>
        <div className="pt-6"></div>
        <div className="rounded-lg bg-white px-6 pt-6">
          <div className="mb-2 block text-lg font-bold text-gray-700">
            Add Book
          </div>
          <div className="">
            <div className="col-span-2 mb-3 flex items-end xl:w-96">
              <div className="input-group relative mb-4 flex w-full flex-wrap items-stretch space-y-5">
                <input
                  type="search"
                  className="form-control min-w-600 relative m-0 block w-full flex-auto rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="Enter ISBNs"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                  value={searchQuery}
                  onChange={handleType}
                />
                <button
                  className="btn inline-block flex items-center rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition  duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                  type="button"
                  id="button-addon2"
                  onClick={handleSearch}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="search"
                    className="w-4"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                    ></path>
                  </svg>
                </button>
                <div className="pl-5 text-sm ">
                  Click twice to complete search
                </div>
              </div>
            </div>
          </div>
          <Box
            sx={{
              height: "auto",
              width: "100%",
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
          <div className="space flex py-3">
            <button
              className="space focus:shadow-outline flex rounded bg-blue-500 py-2 px-4 align-middle font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="button"
              onClick={handleConfirm}
            >
              Confirm Add Books
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Books</title>
        </Head>
        <div className="pt-6"></div>
        <div className="inline-block rounded-lg bg-white px-6 pt-6">
          <div className="mb-2 block text-lg font-bold text-gray-700">
            Add Book
          </div>
          <div className="flex grid grid-cols-2 items-center">
            <div className="col-span-2 mb-3 flex items-end xl:w-96">
              <div className="input-group relative mb-4 flex w-full flex-wrap items-stretch space-y-5">
                <input
                  type="search"
                  className="form-control relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                  placeholder="Enter ISBNs"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                  value={searchQuery}
                  onChange={handleType}
                />
                <div className="font-sm font-light">
                  Delimiters may be commas, tabs, semicolons, spaces, or
                  newlines.
                </div>
                <button
                  className="btn inline-block flex items-center rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition  duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                  type="button"
                  id="button-addon2"
                  onClick={handleSearch}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="search"
                    className="w-4"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
