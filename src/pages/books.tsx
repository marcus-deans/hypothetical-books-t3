import Head from "next/head";
import Book from "../components/Book"
import Searchbar from "../components/Searchbar";
import { useState } from "react";
function books() {

  const [searchQuery, setSearchQuery] = useState("")
  const stateUpdateWrapper = (input: string)  => {setSearchQuery(input)}
 return (
    <>
    <Head>
      <title>Books</title>
    </Head>
    <Searchbar updateSearch = {stateUpdateWrapper}></Searchbar>
    <div>{searchQuery}</div>
    </>
  )
}

export default books