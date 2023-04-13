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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import type { Book } from "@prisma/client";
import { TextareaAutosize } from "@mui/material";
import { placeholderUrl } from "../../utils/media";

export interface BookDisplayDetails {
  id: number;
  imgUrl: string;
  remoteImgUrl: string;
  title: string;
  authors: string;
  isbn_13: string;
  isbn_10: string;
  publicationYear: number;
  pageCount: number;
  remotePageCount: number;
  publisher: string;
  genre: string;
  width: number;
  remoteWidth: number;
  height: number;
  remoteHeight: number;
  thickness: number;
  remoteThickness: number;
  retailPrice: number;
  relatedBooks: (Book & { authors: { name: string }[] })[];
}

export default function AddBook() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayedBooks, setDisplayedBooks] = useState<BookDisplayDetails[]>(
    []
  );

  const [parsedIsbns, setParsedIsbns] = useState<string[]>([]);
  const retrieveDetailsQuery = api.googleBooks.retrieveDetailsByISBNs.useQuery(
    { isbns: parsedIsbns },
    { enabled: !!parsedIsbns }
  );

  const addMutation = api.books.add.useMutation();

  const allBooksQuery = api.books.getAll.useQuery({
    cursor: null,
    limit: 100,
  });
  const allBooksISBNS =
    allBooksQuery?.data?.items.map((book) => book.isbn_13) ?? [];
  const router = useRouter();

  const performQuery = () => {
    const retrievedBooksData = retrieveDetailsQuery?.data ?? [];
    if (retrievedBooksData) {
      retrievedBooksData.map((retrievedBook, index) => {
        const googleBooksDetails = retrievedBook.googleBookDetails;
        const retailPrice = retrievedBook.booksRunPrice;
        const relatedBooks = retrievedBook.relatedBooks;
        const remoteBookDetails = retrievedBook.remoteBookDetails;

        console.log("Adding retrieved book to rows");
        console.log(retrievedBook);
        let isbn_10 = null;
        let isbn_13 = null;

        if (googleBooksDetails?.industryIdentifiers[0]?.type === "ISBN_13") {
          isbn_13 = googleBooksDetails?.industryIdentifiers[0].identifier;
          if (googleBooksDetails?.industryIdentifiers[1]?.type === "ISBN_10") {
            isbn_10 = googleBooksDetails?.industryIdentifiers[1].identifier;
          }
        }
        if (googleBooksDetails?.industryIdentifiers[1]?.type === "ISBN_13") {
          isbn_13 = googleBooksDetails.industryIdentifiers[1].identifier;
          if (googleBooksDetails?.industryIdentifiers[0]?.type === "ISBN_10") {
            isbn_10 = googleBooksDetails.industryIdentifiers[0].identifier;
          }
        }

        const displayBook = {
          imgUrl: googleBooksDetails.imageLinks?.thumbnail ?? "",
          remoteImgUrl: remoteBookDetails?.imgUrl ?? "",
          id: index,
          title: googleBooksDetails.title,
          authors: googleBooksDetails.authors.join(", "),
          isbn_13: isbn_13 ?? "Unknown",
          isbn_10: isbn_10 ?? "Unknown",
          publicationYear: new Date(
            googleBooksDetails.publishedDate
          ).getFullYear(),
          pageCount: isNaN(googleBooksDetails.pageCount)
            ? 0
            : googleBooksDetails.pageCount,
          remotePageCount: remoteBookDetails?.pageCount ?? "Unknown",
          publisher: googleBooksDetails?.publisher ?? "Unknown",
          genre: googleBooksDetails?.categories?.join(", ") ?? "Unknown",
          width: 0,
          remoteWidth: remoteBookDetails?.width ?? "Unknown",
          height: 0,
          remoteHeight: remoteBookDetails?.height ?? "Unknown",
          thickness: 0,
          remoteThickness: remoteBookDetails?.thickness ?? "Unknown",
          retailPrice: retailPrice,
          relatedBooks: relatedBooks,
        };
        setDisplayedBooks((prev) => [...prev, displayBook]);
      });
      setIsLoaded(true);
    }
  };

  const handleSearch = () => {
    if (searchQuery === "") {
      toast.error("Please enter an ISBN.");
      return;
    }
    setDisplayedBooks([]);
    setIsLoaded(false);
    // 9781250158079, 9781101904954, 9780393072235
    // Antifragile: 9780812979688
    const isbnSearchList = searchQuery.replace(/-/g, "").split(/[\s,;\t\n]+/g);
    const uniqueISBNs = [...new Set(isbnSearchList)];
    setParsedIsbns(uniqueISBNs);
    uniqueISBNs.forEach((isbn) => {
      if (isbn.length !== 10 && isbn.length !== 13) {
        if (retrieveDetailsQuery.isSuccess && isLoaded) {
          toast.error(`ISBN ${isbn} is not a valid ISBN.`);
        }
        setParsedIsbns((prev) => prev.filter((item) => item !== isbn));
      }
      if (allBooksISBNS.includes(isbn)) {
        if (retrieveDetailsQuery.isSuccess && isLoaded) {
          toast.error(
            `ISBN ${isbn} already exists in the database and was removed from search.`
          );
        }
        setParsedIsbns((prev) => prev.filter((item) => item !== isbn));
        if (parsedIsbns.length === 0) {
          return;
        }
      }
    });
    void retrieveDetailsQuery.refetch();
    performQuery();
    setDisplayedBooks((prev) => [...prev]);
  };

  const handleConfirm = () => {
    try {
      displayedBooks.map((row) => {
        console.log("Adding book to database");
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
          relatedBooks: row.relatedBooks.map((relatedBook) => relatedBook.id),
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
  const [modalId, setModalId] = React.useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const modalStyle = {
    /* eslint-disable */
    position: "absolute" as "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "6px",
    p: 3,
    /* eslint-enable */
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
        url ??= placeholderUrl;
        // if (!url || url === "") {
        //   url =
        //     placeholderUrl;
        // }
        return (
          <div className="text-blue-600">
            <Image alt={"Book cover"} src={url} width={40} height={60} />
          </div>
        );
      },
    },
    {
      field: "remoteImage",
      headerName: "Remote Cover",
      headerClassName: "header-theme",
      width: 125,
      align: "center",
      renderCell: (params) => {
        /* eslint-disable */
        let url = params.row.remoteImgUrl as string;
        /* eslint-enable */
        if (!url || url === "") {
          url = placeholderUrl;
        }
        console.log(url);
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
      width: 105,
    },
    {
      field: "retailPrice",
      headerName: "Retail Price ($)",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      minWidth: 115,
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
      width: 95,
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
      field: "remoteWidth",
      headerName: "Remote Width",
      type: "number",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      width: 120,
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
      field: "remoteHeight",
      headerName: "Remote Height",
      type: "number",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      width: 120,
    },
    {
      field: "thickness",
      headerName: "Thickness (in.)",
      type: "number",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      width: 115,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError =
          isNaN(Number(params.props.value)) || Number(params.props.value) < 0;
        return { ...params.props, error: hasError };
      },
      editable: true,
    },
    {
      field: "remoteThickness",
      headerName: "Remote Thickness",
      type: "number",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      width: 145,
    },
    {
      field: "relatedBooks",
      headerName: "Related Books",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      minWidth: 170,
      renderCell: (params) => {
        /* eslint-disable */
        type RelatedBooksDisplayType = (Book & {
          authors: { name: string }[];
        })[];
        let relatedBooks = params.row.relatedBooks as RelatedBooksDisplayType;
        console.log(relatedBooks);
        if (relatedBooks.length === 0) {
          return <div>No Related Books Found! (0)</div>;
        }
        const id = params.row.id as string;
        const title = params.row.title as string;
        const authors = params.row.authors as string;
        /* eslint-enable */
        return (
          <div>
            <button
              type="button"
              onClick={() => {
                handleOpen();
                setModalId(id);
              }}
            >
              See Related Books ({relatedBooks.length})
            </button>

            <Modal
              open={id === modalId && open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Related Books for: {title} by {authors}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {/* eslint-disable */}
                  {relatedBooks.map((relatedBook) => {
                    return (
                      <div>
                        <div>
                          {relatedBook.title} by {relatedBook.authors[0]?.name}
                        </div>
                      </div>
                    );
                    {
                      /* eslint-enable */
                    }
                  })}
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
        return newRow as BookDisplayDetails;
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

  // 9780812979688, 9781250158079
  return (
    <>
      <Head>
        <title>Books</title>
      </Head>
      <div className="pt-6"></div>
      <div
        className={`${
          retrieveDetailsQuery.isSuccess && isLoaded
            ? "rounded-lg bg-white px-6 pt-6"
            : "inline-block rounded-lg bg-white px-6 pt-6"
        }`}
      >
        <div className="mb-2 block text-lg font-bold text-gray-700">
          Add Book
        </div>
        <div className="">
          <div className="col-span-2 mb-3 flex items-end xl:w-96">
            <div className="input-group relative mb-4 flex w-full flex-wrap items-stretch space-y-5">
              <TextareaAutosize
                className="form-control relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                placeholder="Enter ISBNs"
                aria-label="Search"
                aria-describedby="button-addon2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {!(
                retrieveDetailsQuery.isFetching ||
                (retrieveDetailsQuery.isSuccess && isLoaded)
              ) ? (
                <div className="font-sm font-light">
                  Delimiters may be commas, tabs, semicolons, spaces, or
                  newlines.
                </div>
              ) : null}
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
              {retrieveDetailsQuery.isFetching ||
              (retrieveDetailsQuery.isSuccess && isLoaded) ? (
                <div className="flex items-center justify-center pl-6 text-sm">
                  Click twice to complete search
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {retrieveDetailsQuery.isFetching ? (
          <div className="pb-3">Loading...</div>
        ) : null}
        {retrieveDetailsQuery.isSuccess && isLoaded ? (
          <div>
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
                rows={displayedBooks}
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
        ) : null}
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
}
