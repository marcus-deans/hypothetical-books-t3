import { useState } from "react"
interface InputBarProps{
    setSearchComplete: () => void;
}


export const InputBar = (props:InputBarProps) => {
const[ISBNSearches, setISBNSearches] = useState<string[]>([])
const [searchValue, setSearchValue] = useState("")
const handleISBNSubmit = () =>{props.setSearchComplete()
    let searchSplit:string[] = searchValue.replace(/\s/g, "").split(",");
    for (let i = 0; i < searchSplit.length; i++) {
        setISBNSearches(ISBNSearches => [...(ISBNSearches ?? []), searchSplit[i] ?? ""]);
    }
    setSearchValue("");
}
const handleSearchTyping = (e:any) => {
    setSearchValue(e.target.value)

}
//setMyArray(oldArray => [...oldArray, newElement]);
  return (
    <>
        <div className="relative w-full">
            <input type="search" onChange = {handleSearchTyping}id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50  border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" value = {searchValue} placeholder = "Enter ISBNs To Find..."required />
            <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white border border-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleISBNSubmit}>
                <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span className="sr-only">Search</span>
            </button>
        </div>
    </>
  )
}
