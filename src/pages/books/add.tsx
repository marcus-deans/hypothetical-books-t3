import Head from "next/head";
import AutocompleteSearchbar from "../../components/books-components/AutocompleteSearchbar";
import type { Suggestion } from "../../components/books-components/suggestion-service";
import { getSuggestions } from "../../components/books-components/suggestion-service";

export default function Add() {
  // const [searchQuery, setSearchQuery] = useState("");
  // const stateUpdateWrapper = (input: string) => {
  //   setSearchQuery(input);
  // };

  // const submissionHandler = (input: string) => {
  //   setSearchQuery(input);
  //   console.log(input);
  // };
  const renderSuggestion = (suggestion: Suggestion) => {
    return `${suggestion.symbol} - ${suggestion.name}`;
  };

  return (
    <>
      <Head>
        <title>Books</title>
      </Head>
      <AutocompleteSearchbar
        getSuggestions={getSuggestions}
        renderSuggestion={renderSuggestion}
        onSelect={(suggestion) => console.log(suggestion)}
      />

      {/*<SearchBar submissionHandler={submissionHandler} />*/}
      {/*<div>/!*<AddBooksView />*!/</div>*/}
      {/*<SearchResults searchQuery={searchQuery} />*/}
    </>
  );
}

// export const AddBooksView = () => {
//   const[SearchComplete, setSearchComplete] = useState(false);
//   const[ISBNSearches, setISBNSearches] = useState("");
//   const[bookData, setBookData] = useState([]);
//
//   const ISBNSearchesWrapper = (input:string) => {setISBNSearches(input)
//   }
//   const searchCompleteWrapper = () => {
//     setSearchComplete(true);
//   };
//   return (
//     <>
//       {SearchComplete ? (
//         <div>
//           <TableView labels={["Title", "Author", "ISBN", "Retail Price", "Genre","Inventory Count"] } ISBNQueries = {ISBNSearches.replace(/ /g, '').split(",")}></TableView>
//           {}
//         </div>
//       ) : (<>
//         <InputBar setSearchComplete = {searchCompleteWrapper} setISBNSearchesUpper = {ISBNSearchesWrapper}/>
//         <div className="flex h-screen w-screen justify-center items-center text-4xl text-white">Please Search for ISBNs to View Book Information</div>
//       </>)}
//     </>
//   )
// }
