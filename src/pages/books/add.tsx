import Head from "next/head";
import React, { useState } from "react";
import { api } from "../../utils/api";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import type { GridColDef, GridPreProcessEditCellProps } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import StripedDataGrid from "../../components/table-components/StripedDataGrid";
import Box from "@mui/material/Box";

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
}

export default function AddBook() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [currentIsbn, setCurrentIsbn] = useState("");
  const [currentIsbns, setCurrentIsbns] = useState<string[]>([]);
  const [retrievedBooks, setRetrievedBooks] = useState<GoogleBookDetails[]>([]);
  // const retrieveMutation = api.googleBooks.simpleRetrieveByISBN.useMutation();
  const unknownGenreQuery = api.genres.getByName.useQuery({ name: "Unknown" });
  // const fetchedGoogleBookData = api.googleBooks.simpleRetrieveByISBN.useQuery(
  //   {
  //     isbn: currentIsbn,
  //   },
  //   { enabled: !!currentIsbn }
  // );
  const fetchedGoogleBookData =
    api.googleBooks.multipleRetrieveByIsbns.useQuery(
      {
        isbns: currentIsbns,
      },
      { enabled: !!currentIsbns }
    );

  const addMutation = api.books.add.useMutation();
  const router = useRouter();
  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // const queryApi = async (
  //   isbn: string
  // ): Promise<Array<GoogleBookDetails> | string> => {
  //   const queryURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=AIzaSyCUvnosRtoQlB8Br25-ozT7Oq00x0FI50o`;
  //   try {
  //     const response = await fetch(queryURL);
  //     if (response.status !== 200) {
  //       return "Error retrieving book";
  //     }
  //     const googleBookResponse = (await response.json()) as GoogleBookResponse;
  //     return googleBookResponse.items.map((item) => {
  //       return item.volumeInfo;
  //     });
  //   } catch (error) {
  //     if (error) {
  //       return error.toString();
  //     }
  //     return "Unknown error";
  //   }
  // };
  // return fetch(queryURL)
  //   .then((response) => {
  //     if (response.status !== 200) {
  //       throw new Error("Error retrieving book");
  //     }
  //     return response;
  //   })
  //   .then((response) => response.json())
  //   .then((response) => {
  //     try {
  //       const googleBookResponse = response as GoogleBookResponse;
  //       const volumeInfo = googleBookResponse.items.map((item) => {
  //         return item.volumeInfo;
  //       });
  //       console.log(volumeInfo);
  //       return googleBookResponse;
  //     } catch (error) {
  //       return;
  //     }
  //   });
  const handleSubmit = () => {
    if (searchQuery === "") {
      return;
    }
    setRetrievedBooks([]);
    setIsLoaded(false);
    const inputIsbns = searchQuery.replace(/\s+/g, "").replace(/-/g, "");
    const isbnSearchList = inputIsbns.split(",");
    const googleBooksData = fetchedGoogleBookData?.data;
    if (googleBooksData) {
      setRetrievedBooks(googleBooksData);
    }
  };
  // isbnSearchList.map((isbn, index) => {
  //   setCurrentIsbn(isbn);
  //   const googleBookData = fetchedGoogleBookData?.data;
  //   console.log(googleBookData);
  //   if (googleBookData) {
  //     for (const retrievedBook of googleBookData) {
  //       setRetrievedBooks([...retrievedBooks, retrievedBook]);
  //       console.log(retrievedBooks);
  //     }
  //   }
  //   if (index === isbnSearchList.length - 1) {
  //     console.log("done retrieving all books");
  //     // console.log(retrievedBooks);
  //     setIsLoaded(true);
  //   }
  // });

  // const handleSubmit = () => {
  //   if (searchQuery === "") {
  //     return;
  //   }
  //   setRetrievedBooks([]);
  //   setIsLoaded(false);
  //   //Set search query to empty, split the search query, make the backend calls
  //   const inputIsbns = searchQuery.replace(/\s+/g, "").replace(/-/g, "");
  //   const isbnSearchList = inputIsbns.split(",");
  //   console.log(isbnSearchList);
  //   isbnSearchList.map(async (isbn, index) => {
  //     const fetchedBooks = await queryApi(isbn);
  //     if (typeof fetchedBooks === "string") {
  //       return;
  //     }
  //     fetchedBooks.map((book) => {
  //       // console.log(book);
  //       setRetrievedBooks([...retrievedBooks, book]);
  //       // console.log(book.authors.join(", "));
  //       // console.log(retrievedBooks);
  //     });
  //     if (index === isbnSearchList.length - 1) {
  //       console.log("done retrieving all books");
  //       console.log(retrievedBooks);
  //       setIsLoaded(true);
  //     }
  //   });
  //   setSearchQuery("");
  // };

  const handleConfirm = () => {
    rows.map((row) => {
      console.log("dding book");
      console.log(row);
      addMutation.mutate({
        title: row.title,
        authors: row.authors.split(","),
        isbn_13: row.isbn_13 ?? "Unknown",
        isbn_10: row.isbn_10,
        publisher: row.publisher ?? "",
        publicationYear: row.publicationYear,
        pageCount: row.pageCount,
        width: row.width,
        height: row.height,
        thickness: row.thickness,
        retailPrice: row.retailPrice,
        genreId: unknownGenreQuery?.data?.id ?? "Error", //row.genre actually
        purchaseLines: [],
        salesLines: [],
        inventoryCount: 0,
      });
    });
    // retrievedBooks.map((book) => {
    //   let isbn_10 = null;
    //   let isbn_13 = null;
    //   if (book?.industryIdentifiers[0]?.type === "ISBN_13") {
    //     isbn_13 = book.industryIdentifiers[0].identifier;
    //     if (book?.industryIdentifiers[1]?.type === "ISBN_10") {
    //       isbn_10 = book.industryIdentifiers[1].identifier;
    //     }
    //   }
    //   if (book?.industryIdentifiers[1]?.type === "ISBN_13") {
    //     isbn_13 = book.industryIdentifiers[1].identifier;
    //     if (book?.industryIdentifiers[0]?.type === "ISBN_10") {
    //       isbn_10 = book.industryIdentifiers[0].identifier;
    //     }
    //   }
    //
    //   let publicationYear = Number(new Date(book.publishedDate).getFullYear());
    //   if (isNaN(publicationYear)) {
    //     publicationYear = 0;
    //   }
    //
    //   let pageCount = Number(book.pageCount);
    //   if (isNaN(pageCount)) {
    //     pageCount = 0;
    //   }
    //   console.log("dding book");
    //   console.log(book);
    //   addMutation.mutate({
    //     title: book.title,
    //     authors: book.authors,
    //     isbn_13: isbn_13 ?? "Unknown",
    //     isbn_10: isbn_10,
    //     publisher: book.publisher ?? "",
    //     publicationYear: publicationYear,
    //     pageCount: pageCount,
    //     width: 5,
    //     height: 8,
    //     thickness: 0,
    //     retailPrice: 0,
    //     genreId: unknownGenreQuery.data?.id ?? "Error",
    //     purchaseLines: [],
    //     salesLines: [],
    //     inventoryCount: 0,
    //   });
    // });
    setTimeout(() => {
      void router.push(`/books/`);
    }, 500);
    setIsLoaded(false);
  };

  const columns: GridColDef[] = [
    {
      field: "cover",
      headerName: "Cover",
      headerClassName: "header-theme",
      maxWidth: 20,
    },
    {
      field: "title",
      headerName: "Book Title",
      headerClassName: "header-theme",
      maxWidth: 35,
    },
    {
      field: "authors",
      headerName: "Authors",
      headerClassName: "header-theme",
      maxWidth: 250,
    },
    {
      field: "isbn_13",
      headerName: "ISBN-13",
      headerClassName: "header-theme",
      maxWidth: 125,
    },
    {
      field: "isbn_10",
      headerName: "ISBN-10",
      headerClassName: "header-theme",
      width: 100,
    },
    {
      field: "publicationYear",
      headerName: "Publication Year",
      headerClassName: "header-theme",
      width: 150,
    },
    {
      field: "pageCount",
      headerName: "Page Count",
      headerClassName: "header-theme",
      width: 100,
      editable: true,
    },
    {
      field: "publisher",
      headerName: "Publisher",
      headerClassName: "header-theme",
      maxWidth: 30,
    },
    {
      field: "genre",
      headerName: "Genre",
      type: "number",
      headerClassName: "header-theme",
      maxWidth: 25,
    },
    {
      field: "width",
      headerName: "Width (in.)",
      type: "number",
      headerClassName: "header-theme",
      maxWidth: 150,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value < 0;
        return { ...params.props, error: hasError };
      },
      editable: true,
    },
    {
      field: "height",
      headerName: "Height (in.)",
      type: "number",
      headerClassName: "header-theme",
      maxWidth: 150,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value < 0;
        return { ...params.props, error: hasError };
      },
      editable: true,
    },
    {
      field: "thickness",
      headerName: "Thickness (in.)",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 150,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value < 0;
        return { ...params.props, error: hasError };
      },
      editable: true,
    },
    {
      field: "retailPrice",
      headerName: "Retail Price ($)",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 200,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value < 0;
        return { ...params.props, error: hasError };
      },
      editable: true,
    },
  ];

  const rows = retrievedBooks.map((retrievedBook, index) => {
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

    return {
      id: index,
      title: retrievedBook.title,
      authors: retrievedBook.authors.join(", "),
      isbn_13: isbn_13 ?? "N/A",
      isbn_10: isbn_10 ?? "N/A",
      publicationYear: new Date(retrievedBook.publishedDate).getFullYear(),
      pageCount: isNaN(retrievedBook.pageCount) ? 0 : retrievedBook.pageCount,
      publisher: retrievedBook.publisher ?? "N/A",
      genre: retrievedBook?.categories?.join(", ") ?? "N/A",
      width: 5,
      height: 8,
      thickness: 0.5,
      retailPrice: 0,
    };
  });
  // 9780812979688, 9781250158079
  if (isLoaded) {
    console.log("all rows");
    console.log(rows);
    return (
      <>
        <Head>
          <title>Add Book</title>
        </Head>
        <div className="m-5 h-3/4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
          <div className="mb-3 flex w-max">
            <div className="mb-2 block text-lg font-bold text-gray-700">
              Add Book
            </div>
            <div className="input-group p-y-5 mb-4 flex w-full items-stretch space-y-5 space-x-3">
              <input
                type="search"
                className="form-control min-w-600 relative m-0 block w-full flex-auto rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                placeholder="Enter ISBNs (Comma Separated)"
                aria-label="Search"
                aria-describedby="button-addon2"
                value={searchQuery}
                onChange={handleType}
              />
              <button
                className="btn inline-block flex items-center rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition  duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                type="button"
                id="button-addon2"
                onClick={handleSubmit}
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
          <Box
            sx={{
              height: 400,
              width: "100%",
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
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
              getRowClassName={(params) =>
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
              }
            />
          </Box>
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Confirm Add Books
          </Button>
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
                  placeholder="Enter ISBNs (Comma Separated)"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                  value={searchQuery}
                  onChange={handleType}
                />
                <button
                  className="btn inline-block flex items-center rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition  duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                  type="button"
                  id="button-addon2"
                  onClick={handleSubmit}
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
