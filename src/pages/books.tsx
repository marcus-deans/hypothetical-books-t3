import Head from "next/head";
import Book from "../components/Book"
import Searchbar from "../components/Searchbar";
function books() {
  return (
    <>
    <Head>
      <title>Books</title>
    </Head>
    <Searchbar></Searchbar>
    <ul>
      <Book title = "Great Gatsby" authors = {["F Scott Fitzgerald"]} ISBN13 = {12345}  publisher = "Harper Collins" publicationYear = {2010} retailPrice = {10} genre = "fiction"/>
    </ul>
    </>
  )
}

export default books