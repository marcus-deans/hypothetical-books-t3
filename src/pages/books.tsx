import Head from "next/head";
import Book from "../components/Book"
function books() {
  return (
    <>
    <Head>
      <title>Books</title>
    </Head>
    <ul>
      <Book title = "Hello Book" />
      <li>Book Two</li>
    </ul>
    </>
  )
}

export default books