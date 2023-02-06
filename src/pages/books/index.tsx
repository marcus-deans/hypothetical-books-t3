import Head from "next/head";
import Searchbar from "../../components/Searchbar";
import { useState } from "react";
import {TableView} from "../../components/TableView";
import { AddBooksView } from "../../components/AddBooksView";
import { api } from "../../utils/api";

export default function Books() {
  const books =
    api.books.getAll.useQuery({ cursor: "1", limit: 50 })?.data?.items ?? [];
  const [searchQuery, setSearchQuery] = useState("");
  const [checkBoxState, setCheckBoxState] = useState(false);
  const stateUpdateWrapper = (input: string) => {
    setSearchQuery(input);
  };

  return (
    <>
      <Head>
        <title>Books</title>
      </Head>
  <div className = "flex">
  <label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox"  checked = {checkBoxState} className="sr-only peer" onChange={() => setCheckBoxState(!checkBoxState)}/>

  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{}</span>
</label>
<div className="dark:text-white">{checkBoxState ? ("My Books") : ("Add Books")}</div>
</div>
      {checkBoxState ? <Searchbar updateSearch={stateUpdateWrapper}></Searchbar> : <></>}
<div>
  {checkBoxState ? (
<TableView labels = {["Title", "Author", "ISBN", "Retail Price", "Genre","Inventory Count"]} />
  ) : (<AddBooksView />)}
</div>
</>
  );
}
