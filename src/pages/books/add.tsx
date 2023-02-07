import Head from "next/head";
import Searchbar from "../../components/Searchbar";
import { useState } from "react";
import { TableView } from "../../components/TableView";
import { AddBooksView } from "../../components/AddBooksView";
import { api } from "../../utils/api";

export default function Add() {
  const [searchQuery, setSearchQuery] = useState("");
  // const [checkBoxState, setCheckBoxState] = useState(false);
  const stateUpdateWrapper = (input: string) => {
    setSearchQuery(input);
  };

  return (
    <>
      <Head>
        <title>Books</title>
      </Head>
      <div className="flex">
        <label className="relative inline-flex cursor-pointer items-center">
          {/*<input type="checkbox"  checked = {checkBoxState} className="sr-only peer" onChange={() => setCheckBoxState(!checkBoxState)}/>*/}

          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {}
          </span>
        </label>
        {/*<div className="dark:text-white">{checkBoxState ? ("My Books") : ("Add Books")}</div>*/}
        <div className="dark:text-white">{"My Books"}</div>
      </div>
      {checkBoxState ? (
        <Searchbar updateSearch={stateUpdateWrapper}></Searchbar>
      ) : (
        <></>
      )}
      <div>
        {checkBoxState ? (
          <TableView
            labels={[
              "Title",
              "Author",
              "ISBN",
              "Retail Price",
              "Genre",
              "Inventory Count",
            ]}
          />
        ) : (
          <AddBooksView />
        )}
      </div>
    </>
  );
}
