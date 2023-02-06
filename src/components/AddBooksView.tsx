import { InputBar } from "./InputBar"
import { useState } from "react"
import { TableView } from "./TableView";
import { api } from "../utils/api";

export const AddBooksView = () => {
const[SearchComplete, setSearchComplete] = useState(false);
const[ISBNSearches, setISBNSearches] = useState("");
const[bookData, setBookData] = useState([]);

const ISBNSearchesWrapper = (input:string) => {setISBNSearches(input)
}
const searchCompleteWrapper = () => {
    setSearchComplete(true);
  }; 
    return (
    <>
    {SearchComplete ? (         
    <div>
            <TableView labels={["Title", "Author", "ISBN", "Retail Price", "Genre","Inventory Count"] } ISBNQueries = {ISBNSearches.replace(/ /g, '').split(",")}></TableView>
            {}
        </div>
) : (<>
<InputBar setSearchComplete = {searchCompleteWrapper} setISBNSearchesUpper = {ISBNSearchesWrapper}/>
<div className="flex h-screen w-screen justify-center items-center text-4xl text-white">Please Search for ISBNs to View Book Information</div>
</>)}
    </>
  )
}
