import { InputBar } from "./InputBar"
import { useState } from "react"
export const AddBooksView = () => {
const[SearchComplete, setSearchComplete] = useState(false);

const searchCompleteWrapper = () => {
    setSearchComplete(true);
  };  return (
    <>
    <InputBar setSearchComplete = {searchCompleteWrapper}/>
    {SearchComplete ? ( <div>ISBN Lists Go Here</div>) :( <div className="flex h-screen w-screen justify-center items-center text-4xl text-white">Please Search for ISBNs to View Book Information</div>)}
    </>
  )
}
