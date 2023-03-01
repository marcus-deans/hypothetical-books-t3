import Head from "next/head";
import React, { useState } from "react";
import { api } from "../../utils/api";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import type { GridColDef } from "@mui/x-data-grid";
import StripedDataGrid from "../../components/table-components/StripedDataGrid";
import { GridToolbar } from "@mui/x-data-grid";
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
  const [retrievedBooks, setRetrievedBooks] = useState<GoogleBookDetails[]>([]);
  // const retrieveMutation = api.googleBooks.simpleRetrieveByISBN.useMutation();
  const unknownGenreQuery = api.genres.getByName.useQuery({ name: "Unknown" });
  const addMutation = api.books.add.useMutation();
  const router = useRouter();
  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const queryApi = async (
    isbn: string
  ): Promise<Array<GoogleBookDetails> | string> => {
    const queryURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=AIzaSyCUvnosRtoQlB8Br25-ozT7Oq00x0FI50o`;
    try {
      const response = await fetch(queryURL);
      if (response.status !== 200) {
        return "Error retrieving book";
      }
      const googleBookResponse = (await response.json()) as GoogleBookResponse;
      return googleBookResponse.items.map((item) => {
        return item.volumeInfo;
      });
    } catch (error) {
      if (error) {
        return error.toString();
      }
      return "Unknown error";
    }
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

  const handleSubmit = () => {
    if (searchQuery === "") {
      return;
    }
    setRetrievedBooks([]);
    setIsLoaded(false);
    //Set search query to empty, split the search query, make the backend calls
    const inputIsbns = searchQuery.replace(/\s+/g, "").replace(/-/g, "");
    const isbnSearchList = inputIsbns.split(",");
    console.log(isbnSearchList);
    isbnSearchList.map(async (isbn, index) => {
      const fetchedBooks = await queryApi(isbn);
      if (typeof fetchedBooks === "string") {
        return;
      }
      fetchedBooks.map((book) => {
        console.log(book);
        setRetrievedBooks([...retrievedBooks, book]);
        console.log(book.authors.join(", "));
        console.log(retrievedBooks);
      });
      if (index === isbnSearchList.length - 1) {
        console.log(retrievedBooks);
        setIsLoaded(true);
      }
    });
    setSearchQuery("");
  };

  const handleConfirm = () => {
    retrievedBooks.map((book) => {
      let isbn_10 = null;
      let isbn_13 = null;
      if (book?.industryIdentifiers[0]?.type === "ISBN_13") {
        isbn_13 = book.industryIdentifiers[0].identifier;
        if (book?.industryIdentifiers[1]?.type === "ISBN_10") {
          isbn_10 = book.industryIdentifiers[1].identifier;
        }
      }
      if (book?.industryIdentifiers[1]?.type === "ISBN_13") {
        isbn_13 = book.industryIdentifiers[1].identifier;
        if (book?.industryIdentifiers[0]?.type === "ISBN_10") {
          isbn_10 = book.industryIdentifiers[0].identifier;
        }
      }

      let publicationYear = Number(new Date(book.publishedDate).getFullYear());
      if (isNaN(publicationYear)) {
        publicationYear = 0;
      }

      let pageCount = Number(book.pageCount);
      if (isNaN(pageCount)) {
        pageCount = 0;
      }
      console.log("dding book");
      console.log(book);
      addMutation.mutate({
        title: book.title,
        authors: book.authors,
        isbn_13: isbn_13 ?? "Unknown",
        isbn_10: isbn_10,
        publisher: book.publisher ?? "",
        publicationYear: publicationYear,
        pageCount: pageCount,
        width: 0,
        height: 0,
        thickness: 0,
        retailPrice: 0,
        genreId: unknownGenreQuery.data?.id ?? "Error",
        purchaseLines: [],
        salesLines: [],
        inventoryCount: 0,
      });
    });
    setTimeout(() => {
      void router.push(`/books/`);
    }, 500);
    setIsLoaded(false);
  };

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Book Title",
      headerClassName: "header-theme",
      flex: 1,
    },
    {
      field: "authors",
      headerName: "Authors",
      headerClassName: "header-theme",
      flex: 1,
    },
    {
      field: "isbn_13",
      headerName: "ISBN-13",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 135,
    },
    {
      field: "isbn_10",
      headerName: "ISBN-10",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 100,
    },
    {
      field: "publicationYear",
      headerName: "Publication Year",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 125,
    },
    {
      field: "pageCount",
      headerName: "Page Count",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 110,
    },
    {
      field: "publisher",
      headerName: "Publisher",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 200,
    },
    {
      field: "genre",
      headerName: "Genre",
      headerClassName: "header-theme",
      flex: 1,
      maxWidth: 200,
    },
  ];

  const rows = retrievedBooks.map((retrievedBook, index) => {
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
      pageCount: retrievedBook.pageCount,
      publisher: retrievedBook.publisher ?? "N/A",
      genre: retrievedBook?.categories?.join(", ") ?? "N/A",
    };
  });

  if (isLoaded) {
    return (
      <>
        <Head>
          <title>Books</title>
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
          <Box
            sx={{
              height: "auto",
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
              pageSize={6}
              rowsPerPageOptions={[6]}
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
          <div className="flex py-3 space">
            <Button variant="contained" color="primary" onClick={handleConfirm}>
              Confirm Add Books
            </Button>
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

// export const AddBooksView = () => {
//   const[SearchComplete, setSearchComplete] = useState(false);
//   const[ISBNSearches, setISBNSearches] = useState("");
//   const[bookData, setBookData] = useState([]);
//
//   const ISBNSearchesWrapper = (input:string) => {setISBNSearches(input)
//   }
//   const searchCompleteWrapper = () => {
//     setSearchComplete(true);
//   };
//   return (
//     <>
//       {SearchComplete ? (
//         <div>
//           <TableView labels={["Title", "Author", "ISBN", "Retail Price", "Genre","Inventory Count"] } ISBNQueries = {ISBNSearches.replace(/ /g, '').split(",")}></TableView>
//           {}
//         </div>
//       ) : (<>
//         <InputBar setSearchComplete = {searchCompleteWrapper} setISBNSearchesUpper = {ISBNSearchesWrapper}/>
//         <div classNameName="flex h-screen w-screen justify-center items-center text-4xl text-white">Please Search for ISBNs to View Book Information</div>
//       </>)}
//     </>
//   )
// }
