import Head from "next/head";
import Autocomplete from "@mui/joy/Autocomplete";
import Input from "@mui/joy/Input";
import React, { useState } from "react";
import { api } from "../../utils/api";
import { env } from "../../env/server.mjs";

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
  description: string;
  industryIdentifiers: {
    type: string;
    identifier: string;
  }[];

  pageCount: number;
  categories: string[];
}
export default function AddBook() {
  const [searchQuery, setSearchQuery] = useState("");
  const retrieveMutation = api.googleBooks.simpleRetrieveByISBN.useMutation();
  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = () => {
    if (searchQuery === "") {
      return;
    }
    console.log("Attempting to retrieve");
    //Set search query to empty, split the search query, make the backend calls
    const inputIsbns = searchQuery.replace(/\s+/g, "");
    const isbnSearchList = inputIsbns.split(",");
    const retrievedBooks = isbnSearchList.map(async (isbn) => {
      console.log("calling TRPC with isbn: " + isbn);
      const queryURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=AIzaSyCUvnosRtoQlB8Br25-ozT7Oq00x0FI50o`;
      return await fetch(queryURL)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Error retrieving book");
          }
          return response;
        })
        .then((response) => response.json())
        .then((response) => {
          try {
            const googleBookResponse = response as GoogleBookResponse;
            const volumeInfo = googleBookResponse.items.map((item) => {
              return item.volumeInfo;
            });
            console.log(volumeInfo);
            return googleBookResponse;
          } catch (error) {
            return;
          }
        });

      // const retrieved = retrieveMutation.mutate({ isbn: isbn });
    });
    console.log(retrievedBooks);
    setSearchQuery("");
  };

  return (
    <>
      <Head>
        <title>Books</title>
      </Head>
      <div className="p-y-10 flex justify-center rounded-lg bg-white">
        <div className="mb-3  xl:w-96">
          <div className="input-group p-y-5 relative mb-4 flex w-full flex-wrap items-stretch space-y-5">
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
    </>
  );
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
