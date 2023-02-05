import Head from "next/head";
import Searchbar from "../../components/Searchbar";
import { useState } from "react";

export default function Books() {
  const [searchQuery, setSearchQuery] = useState("");
  const stateUpdateWrapper = (input: string) => {
    setSearchQuery(input);
  };
  return (
    <>
      <Head>
        <title>Books</title>
      </Head>
      <Searchbar updateSearch={stateUpdateWrapper}></Searchbar>
      <div>{searchQuery}</div>
    </>
  );
}
