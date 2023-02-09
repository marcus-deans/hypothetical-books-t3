// import { useState } from "react";
// import { TableView } from "./table-components/TableView";
//
// interface InputBarProps {
//   setSearchComplete: () => void;
//   setISBNSearchesUpper: (inputs: string) => void;
// }
//
// export const InputBar = (props: InputBarProps) => {
//   const [ISBNSearches, setISBNSearches] = useState("");
//   const [searchValue, setSearchValue] = useState("");
//   const handleISBNSubmit = () => {
//     props.setSearchComplete();
//     props.setISBNSearchesUpper(ISBNSearches);
//     setSearchValue("");
//   };
//   const handleSearchTyping = (e: any) => {
//     setSearchValue(e.target.value);
//     setISBNSearches(e.target.value);
//   };
//   return (
//     <>
//       <div className="relative w-full">
//         <input
//           type="search"
//           onChange={handleSearchTyping}
//           id="search-dropdown"
//           className="z-20 block w-full border border-l-2 border-gray-300 border-l-gray-50  bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:border-l-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
//           value={searchValue}
//           placeholder="Enter ISBNs To Find..."
//           required
//         />
//         <button
//           type="submit"
//           className="border-blue absolute top-0 right-0 border p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           onClick={handleISBNSubmit}
//         >
//           <svg
//             aria-hidden="true"
//             className="h-5 w-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//             ></path>
//           </svg>
//           <span className="sr-only">Search</span>
//         </button>
//       </div>
//     </>
//   );
// };
