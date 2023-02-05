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
    <Book title="To Kill a Mockingbird" authors={["Harper Lee"]} publisher="penguin" ISBN13={12345678910111213} publicationYear={2010} retailPrice={10} genre={"Fiction"}></Book>
    </>
  )
}

export default books