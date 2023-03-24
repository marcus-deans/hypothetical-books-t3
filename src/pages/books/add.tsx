import Head from "next/head";
import React, { useState } from "react";
import { api } from "../../utils/api";
import { Button } from "@mui/material";
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

interface BooksRunResponse {
  status: string;
  message: string;
  offers: {
    booksrun: {
      new: {
        price: number;
      };
    };
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
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [currentIsbn, setCurrentIsbn] = useState("");
  const [pricingData, setPricingData] = useState<number[]>([]);
  const [retrievedBooks, setRetrievedBooks] = useState<GoogleBookDetails[]>([]);
  const [displayedBooks, setDisplayedBooks] = useState<BookDetails[]>([]);
  // const retrieveMutation = api.googleBooks.simpleRetrieveByISBN.useMutation();
  const unknownGenreQuery = api.genres.getByName.useQuery({ name: "Unknown" });
  const addMutation = api.books.add.useMutation();
  const router = useRouter();
  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const queryBooksRunApi = async (isbns: string[]): Promise<Array<number>> => {
    const bookPrices: Array<number> = [];
    for (const isbn of isbns) {
      console.log(`ISBN: ${isbn}`);
      const queryURL = `https://booksrun.com/api/v3/price/buy/${isbn}?key=faajt0grxch1m5zcc9cp`;
      try {
        // const myInit = {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        //     "Access-Control-Allow-Headers":
        //       "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        //   },
        //   mode: "cors",
        // };

        // const response = await fetch(queryURL, myInit);
        const response = await fetch(queryURL);
        if (response.status !== 200) {
          continue;
        }
        const bookPriceResponse = (await response.json()) as BooksRunResponse;
        bookPrices.push(bookPriceResponse.offers.booksrun.new.price);
      } catch (error) {
        toast.error("Error retrieving book price from BooksRun");
        bookPrices.push(0);
        console.log(error);
      }
    }
    return bookPrices;
  };

  const queryGoogleBooksApi = async (
    isbns: string[]
  ): Promise<Array<GoogleBookDetails>> => {
    const bookDetails: Array<GoogleBookDetails> = [];
    for (const isbn of isbns) {
      console.log(`ISBN: ${isbn}`);
      const queryURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=AIzaSyCUvnosRtoQlB8Br25-ozT7Oq00x0FI50o`;
      try {
        const response = await fetch(queryURL);
        if (response.status !== 200) {
          continue;
        }
        const googleBookResponse =
          (await response.json()) as GoogleBookResponse;
        googleBookResponse.items.map((item) => {
          bookDetails.push(item.volumeInfo);
        });
      } catch (error) {
        console.log(error);
      }
    }
    return bookDetails;
  };
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

  const performQuery = async (isbnSearchList: string[]) => {
    const googleBooksData = await queryGoogleBooksApi(isbnSearchList);
    // const booksRunData = await queryBooksRunApi(isbnSearchList);
    if (googleBooksData) {
      console.log("Setting retreived books with:");
      console.log(googleBooksData);
      setRetrievedBooks(googleBooksData);
      retrievedBooks.map((retrievedBook, index) => {
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
        // let retailPrice = isNaN(Number(booksRunData[index]))
        //   ? 0
        //   : booksRunData[index];
        // if (retailPrice === undefined) {
        //   retailPrice = 0;
        // }
        const retailPrice = 0;
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
        };
        setDisplayedBooks((prev) => [...prev, displayBook]);
      });
      setIsLoaded(true);
    }
  };

  const handleSubmit = () => {
    if (searchQuery === "") {
      return;
    }
    setRetrievedBooks([]);
    setIsLoaded(false);

    // 9781250158079, 9781101904954, 9780393072235
    const isbnSearchList = searchQuery.replace(/-/g, "").split(/[\s,;\t\n]+/g);

    void performQuery(isbnSearchList);
    setSearchQuery("");
  };

  const handleConfirm = () => {
    try {
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
          genreName: row.genre, //row.genre actually
          imgUrl: row.imgUrl,
          purchaseLines: [],
          salesLines: [],
          inventoryCount: 0,
        });
      });
      setTimeout(() => {
        void router.push("/books");
      }, 500);
    } catch (error) {
      console.log(error);
    }
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
  // const rows: BookDetails[] = retrievedBooks.map((retrievedBook, index) => {
  //   console.log("Adding retrieved book to rows");
  //   console.log(retrievedBook);
  //   let isbn_10 = null;
  //   let isbn_13 = null;
  //   if (retrievedBook?.industryIdentifiers[0]?.type === "ISBN_13") {
  //     isbn_13 = retrievedBook.industryIdentifiers[0].identifier;
  //     if (retrievedBook?.industryIdentifiers[1]?.type === "ISBN_10") {
  //       isbn_10 = retrievedBook.industryIdentifiers[1].identifier;
  //     }
  //   }
  //   if (retrievedBook?.industryIdentifiers[1]?.type === "ISBN_13") {
  //     isbn_13 = retrievedBook.industryIdentifiers[1].identifier;
  //     if (retrievedBook?.industryIdentifiers[0]?.type === "ISBN_10") {
  //       isbn_10 = retrievedBook.industryIdentifiers[0].identifier;
  //     }
  //   }
  //
  //   return {
  //     imgUrl: retrievedBook.imageLinks?.thumbnail ?? "",
  //     id: index,
  //     title: retrievedBook.title,
  //     authors: retrievedBook.authors.join(", "),
  //     isbn_13: isbn_13 ?? "Unknown",
  //     isbn_10: isbn_10 ?? "Unknown",
  //     publicationYear: new Date(retrievedBook.publishedDate).getFullYear(),
  //     pageCount: isNaN(retrievedBook.pageCount) ? 0 : retrievedBook.pageCount,
  //     publisher: retrievedBook.publisher ?? "Unknown",
  //     genre: retrievedBook?.categories?.join(", ") ?? "Unknown",
  //     width: 5,
  //     height: 8,
  //     thickness: 0.5,
  //     retailPrice: 0,
  //   };
  // });
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
              onClick={handleConfirm}>
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
