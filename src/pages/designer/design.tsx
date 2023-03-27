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
  
  import { Autocomplete, Card, CardContent, CardMedia, Typography, Grid, TextField } from "@mui/material";
  import { useState } from "react";
  import { ToastContainer } from "react-toastify";
  import { toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  
  // const shelfSpace =
  //     data.thickness === 0
  //       ? (0.8 * data.inventoryCount).toFixed(2)
  //       : (data.thickness * data.inventoryCount).toFixed(2);
  
  // const shelfSpaceString =
  // data.thickness === 0
  //   ? `${shelfSpace.toString()}* in.`
  //   : `${shelfSpace.toString()} in.`;
  
  export default function Designer(
    props: InferGetServerSidePropsType<typeof getServerSideProps>
  ) {
    const [shelves, setShelves] = useState<BookCardProps[][]>([]);
    const [bookValue, setBookValue] = useState<{
      label: string;
      id: string;
    } | null>(null);
    const [bookInputValue, setBookInputValue] = useState("");
    const [displayedBooks, setDisplayedBooks] = useState<BookCardProps[]>([]);
    const [totalSpaceSum, setTotalSpaceSum] = useState(0);
  
    const booksQuery = api.books.getAll.useQuery({ cursor: null, limit: 100 });
    const books = booksQuery?.data?.items ?? [];
    const bookOptions = books.map((book) => ({
      label: `${book.title} (${book.isbn_13})`,
      id: book.id,
    }));
  
    const rows = displayedBooks;

    const handleAddShelf = () =>{
        setShelves([...shelves, []]);
    }
  
    const handleSubmit = () => {
      //Add book value to the rows
      //Clear the autocomplete bar to add the next book
      if (bookValue) {
        //use query to get the book we just searched
        const specificBook = books.find((item) => item.id === bookValue.id);
        if (specificBook) {
          const displayBook: BookCardProps = {
            id: specificBook.id,
            title: specificBook.title,
            inventoryCount: specificBook.inventoryCount,
            displayCount: specificBook.inventoryCount,
            width: specificBook.width,
            height: specificBook.height,
            image: null,
            thickness: specificBook.thickness,
            displayStyle: "Spine Out",
            shelfSpace: "",
            usedDefault: false,
          };
          if(specificBook.imgUrl){
            displayBook.image = specificBook.imgUrl;
          }
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
        if (height == 0) {
          height = 8;
        }
        if (width == 0) {
          width = 6;
        }
        return Number((height * width).toFixed(2));
      } else {
        return Number(0);
      }
    };
  
    return (
      <>
        <Head>
          <title>Shelf Calculator</title>
        </Head>
        <div className="rounded-lg bg-white px-6 pt-6">
          <Autocomplete
            options={bookOptions}
            placeholder={"Search books by title"}
            value={bookValue}
            onChange={(event, newValue: { label: string; id: string } | null) => {
              setBookValue(newValue);
            }}
            onInputChange={(event, newBookInputValue: string) => {
              setBookInputValue(newBookInputValue);
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
          <button
            className="btn inline-block flex items-center rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition  duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
            type="button"
            id="button-addon2"
            onClick={handleSubmit}
          >
            Add Book
          </button>
          <button
            className="btn inline-block flex items-center rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition  duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
            type="button"
            id="button-addon2"
            onClick={handleAddShelf}
          >
            Add Shelf
          </button>
        </div>
        <div>
        <Grid container spacing={3}>
      {displayedBooks.map((bookC) => (
        <Grid item xs={3} sm={2} md={2} key={bookC.id}>
          <BookCard {...bookC}/>
        </Grid>
      ))}
    </Grid>
    </div>
    <div>
        {shelves.map((shelf) => {return(<div className ="rounded-lg bg-white px-6 pt-6 ">Shelf: {shelves.indexOf(shelf)}</div>)})};
    </div>
        <ToastContainer></ToastContainer>
      </>
    );
  }
  import React from "react";


  interface BookCardProps {
    id: string;
    title: string;
    inventoryCount: number;
    displayCount: number;
    width: number;
    height: number;
    thickness: number;
    displayStyle: string;
    shelfSpace: string;
    usedDefault: boolean;
    image:string | null;
  }
  
const BookCard = (book: BookCardProps ) => {
 
    return(
    <Card>
        <div>{book.title}</div>
        {book.image &&
        <CardMedia
        style={{ height: 0, paddingTop: "56.25%" }}
        image={book.image}/>
      }

    </Card>

      );
};

