import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { InferGetServerSidePropsType } from "next"
import Head from "next/head";
import { getServerSideProps } from "../report"
import StripedDataGrid from "../../components/table-components/StripedDataGrid";
import  Box  from "@mui/material/Box";
import { api } from "../../utils/api";

import { Autocomplete, TextField } from "@mui/material";
import books from "../books";
import { useState } from "react";
import { apiBaseUrl } from "next-auth/client/_utils";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createRowsInternalCache } from "@mui/x-data-grid/hooks/features/rows/gridRowsUtils";
import { isReadable } from "stream";
import { router } from "@trpc/server";

// const shelfSpace =
//     data.thickness === 0
//       ? (0.8 * data.inventoryCount).toFixed(2)
//       : (data.thickness * data.inventoryCount).toFixed(2);

// const shelfSpaceString =
// data.thickness === 0
//   ? `${shelfSpace.toString()}* in.`
//   : `${shelfSpace.toString()} in.`;


export default function calculator(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
){
  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      headerClassName: "header-theme",
      flex: 1,
      align: "left",
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
      field: "inventoryCount",
      headerName: "Inventory",
      headerClassName: "header-theme",
      flex:1,
    },
    { field: "displayCount",
    headerName: "Display Count",
    headerClassName: "header-theme",
    flex:1,
    editable:true,
  },
{
    field: "width",
    headerName: "Width",
    headerClassName: "header-theme",
    flex:1,
  },
  {
    field: "height",
    headerName: "Height",
    headerClassName: "header-theme",
    flex:1,
  },
  {
    field: "thickness",
    headerName: "Thickness",
    headerClassName: "header-theme",
    flex:1,
  },    
 { field: "displayStyle",
  headerName: "Display Style",
  headerClassName: "header-theme",
  flex:1,
  editable:true,
},
  {
    field: "shelfSpace",
    headerName: "Shelf Space",
    headerClassName: "header-theme",
    flex:1,
  },
  ]
  interface BookCalcDetails {
    id: string;
    title: string;
    inventoryCount:number;
    displayCount:number;
    width: number;
    height: number;
    thickness: number;
    displayStyle:string;
    shelfSpace:string;
    usedDefault:boolean;
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
  interface MyDataGridProps {
    // Other props for the DataGrid component
    onSelectionModelChange: (newSelection: GridSelectionModel) => void;
  }
  const handleSelectionModelChange = (newSelection: GridSelectionModel) => {
    // Handle the new selection here
    console.log('Selected rows:', newSelection);
    // onSelectionModelChange(newSelection);
  };


  const rows = displayedBooks;

  const calcTotalShelfSpace = () =>{
    let sum = 0;
    rows.forEach((row) => {
      if(row.shelfSpace[row.shelfSpace.length-1] === "*"){
        sum += parseInt(row.shelfSpace.substring(0, row.shelfSpace.length - 1));
      }
      else{
      sum += parseInt(row.shelfSpace);
      }
    });
    setTotalSpaceSum(sum)
    
  }

  const handleSubmit = () => {
    //Add book value to the rows
    //Clear the autocomplete bar to add the next book
    if(bookValue){
      //use query to get the book we just searched
    const specificBook = books.find(item => item.id === bookValue.id);
    if(specificBook){
    const displayBook:BookCalcDetails = {
      id: specificBook.id,
      title: specificBook.title,
      inventoryCount:specificBook.inventoryCount,
      displayCount:specificBook.inventoryCount,
      width: specificBook.width,
      height: specificBook.height,
      thickness: specificBook.thickness,
      displayStyle:"Spine Out",
      shelfSpace:"",
      usedDefault:false,
    };
    displayBook.shelfSpace = calcShelfSpace(displayBook.width, displayBook.height, displayBook.thickness, displayBook.displayStyle, displayBook.displayCount).toString();
    if(specificBook.width == 0 || specificBook.height == 0 || specificBook.thickness == 0){
      displayBook.usedDefault = true;
    }
    setDisplayedBooks((prev) => [...prev, displayBook])
    setTotalSpaceSum(totalSpaceSum + parseFloat(displayBook.shelfSpace));
    displayBook.shelfSpace = (displayBook.usedDefault) ? displayBook.shelfSpace+"*" : displayBook.shelfSpace;

    toast.success("Added "+ specificBook.title);
  }  
  }
    setBookInputValue("");
    setBookValue(null);
  };

  const calcShelfSpace= (width:number, height:number, thickness:number, displayMode:String, displayCount:number)  => {
      if(displayMode === "Spine Out"){
        if(thickness === 0 ){
          thickness = 0.8
          return thickness*displayCount;
        }
      }
      if(displayMode === "Cover Out"){
        if(height == 0){
          height = 8;
        }
        if(width == 0){
          width = 6;
        }
        return (height*width);
      }
      else{
        return 0;
      }
  }


  return(
    <>
    <Head>
      <title>Shelf Calculator</title>
    </Head>
    <div className="rounded-lg bg-white px-6 pt-6">
     <Autocomplete
                      options={bookOptions}
                      placeholder={"Search books by title"}
                      value={bookValue}
                      onChange={(
                        event,
                        newValue: { label: string; id: string } | null
                      ) => {
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
                    onClick={handleSubmit}>Add Book </button>
    <div className="mt-5 h-3/4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
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
            onSelectionModelChange ={handleSelectionModelChange}
            rows={rows}
            editMode="row"
            columns={columns}
            autoHeight={true}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowHeight={() => "auto"}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            getRowClassName={(params) =>
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
          />
        </Box>
        <div className = "text-lg">
        {`Total Shelf Space: ${totalSpaceSum} inches`}
        </div>
        <div className="text-sm">
          {'*: Shelf space from estimated width of 0.8, height of 8, or width of 6 for zero-valued parameters'}
        </div>
      </div>
      </div>


      <ToastContainer></ToastContainer>
    </>
  )
}

