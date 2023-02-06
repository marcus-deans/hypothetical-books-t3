import { InputBar } from "./InputBar"
import { useState } from "react"
import { TableView } from "./TableView";
export const AddBooksView = () => {
const[SearchComplete, setSearchComplete] = useState(false);
const[ISBNSearches, setISBNSearches] = useState<string[]>([])

const ISBNSearchesWrapper = (list: string[]) => {setISBNSearches(ISBNSearches => [...ISBNSearches, ...list])}

const searchCompleteWrapper = () => {
    setSearchComplete(true);
  };  return (
    <>
    <InputBar setSearchComplete = {searchCompleteWrapper} setISBNSearchesUpper = {ISBNSearchesWrapper}/>
    {SearchComplete ? (         
    <div>
            <TableView labels={["Title", "Author", "ISBN", "Retail Price", "Genre","Inventory Count"]}></TableView>
        </div>
) :( <div className="flex h-screen w-screen justify-center items-center text-4xl text-white">Please Search for ISBNs to View Book Information</div>)}
    </>
  )
}
