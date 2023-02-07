// import { api } from "../utils/api";
// import { env } from "../env/server.mjs";
//
type SearchResultsProps = {
  searchQuery: string;
};
//
// export default function SearchResults(props: SearchResultsProps) {
//   // const book = api.googleBooks.retrieveByISBN.useQuery({
//   //   isbn: props.searchQuery,
//   // });
//   // const { data } = book;
//
//   const book = fetch(
//     `https://www.googleapis.com/books/v1/volumes?q=isbn:${props.searchQuery}&key=${env.GOOGLE_BOOKS_API_KEY}`
//   );
//   return (
//     <div>
//       <p>Search Results for {props.searchQuery}</p>
//       <p>{data?.title}</p>
//       <p>{data?.publishedDate}</p>
//     </div>
//   );
// }

export default function SearchResults(props: SearchResultsProps) {
  return (
    <div>
      <p>Search Results for {props.searchQuery}</p>
      <p>Title</p>
    </div>
  );
}
