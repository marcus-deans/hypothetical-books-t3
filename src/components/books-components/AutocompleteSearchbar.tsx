// import React, { useState } from "react";
// import type { Observable } from "rxjs";
// import { BehaviorSubject } from "rxjs";
//
// interface Props<S> {
//   // updateSearch: (input: string) => void;
//   // submissionHandler: (input: string) => void;
//   getSuggestions: <S>(subject: BehaviorSubject<string>) => Observable<S[]>;
//   renderSuggestion?: (suggestion: S) => JSX.Element | string;
//   onSelect?: (suggestion: S) => void;
// }
//
// const subject$ = new BehaviorSubject("");
//
// export default function AutocompleteSearchbar<S>(props: Props<S>) {
//   const { renderSuggestion = (s: S) => s, onSelect, getSuggestions } = props;
//   const [value, setValue] = React.useState("");
//   const [suggestions, setSuggestions] = React.useState<S[]>([]);
//   const [highlightedIdx, setHighlightedIdx] = React.useState(0);
//   const [open, setOpen] = useState(false);
//
//   React.useEffect(() => {
//     const subscription = getSuggestions<S>(subject$).subscribe(
//       (suggestions) => {
//         // store suggestions in state
//         setSuggestions(suggestions);
//       },
//       (error) => {
//         // handle error here
//         console.error(error);
//       }
//     );
//
//     return () => subscription.unsubscribe();
//   }, []);
//
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setValue(e.target.value);
//     subject$.next(e.target.value);
//   };
//
//   const handleSelect = (idx: number) => {
//     if (onSelect) {
//       onSelect(suggestions[idx]);
//       setSuggestions([]);
//     }
//   };
//
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
//     const UP = 38;
//     const DOWN = 40;
//     const ENTER = 13;
//     const INITIAL_IDX = 0;
//
//     if (e.keyCode === DOWN) {
//       e.preventDefault();
//       const idx = highlightedIdx;
//       const nextIdx = idx !== undefined ? idx + 1 : INITIAL_IDX;
//
//       if (nextIdx < suggestions.length) {
//         setHighlightedIdx(nextIdx);
//       } else {
//         setHighlightedIdx(INITIAL_IDX);
//       }
//     }
//
//     if (e.keyCode === UP) {
//       e.preventDefault();
//       const lastIdx = suggestions.length - 1;
//       const idx = highlightedIdx;
//       const prevIdx = idx !== undefined ? idx - 1 : lastIdx;
//
//       if (prevIdx >= 0) {
//         setHighlightedIdx(prevIdx);
//       } else {
//         setHighlightedIdx(lastIdx);
//       }
//     }
//
//     if (e.keyCode === ENTER && highlightedIdx !== undefined) {
//       handleSelect(highlightedIdx);
//     }
//   };
//
//   const shouldShowSuggestions = suggestions.length > 0 && value.length > 2;
//
//   const handleDropdownClick = (Event: React.MouseEvent<HTMLElement>) => {
//     console.log(`Dropdown clicked with ${open.toString()}`);
//     setOpen(!open);
//   };
//
//   return (
//     <form>
//       <div className="flex">
//         <button
//           id="dropdown-button"
//           onClick={handleDropdownClick}
//           data-dropdown-toggle="dropdown"
//           className="z-10 inline-flex flex-shrink-0 items-center border border-gray-300 bg-gray-100 py-2.5 px-4 text-center text-sm font-medium text-gray-900  hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
//           type="button"
//         >
//           Search Parameter{" "}
//           <svg
//             aria-hidden="true"
//             className="ml-1 h-4 w-4"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fillRule="evenodd"
//               d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//               clipRule="evenodd"
//             ></path>
//           </svg>
//         </button>
//         {open ? (
//           <div
//             id="dropdown"
//             className="z-10 w-44 divide-y divide-gray-100 bg-white shadow dark:bg-gray-700"
//           >
//             <ul
//               className="py-2 text-sm text-gray-700 dark:text-gray-200"
//               aria-labelledby="dropdown-button"
//             >
//               <li>
//                 <button
//                   type="button"
//                   className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                   onClick={handleDropdownClick}
//                 >
//                   Title
//                 </button>
//               </li>
//               <li>
//                 <button
//                   type="button"
//                   className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
//                   onClick={handleDropdownClick}
//                 >
//                   ISBN13
//                 </button>
//               </li>
//             </ul>
//           </div>
//         ) : (
//           <></>
//         )}
//         <div className="relative w-full">
//           <input
//             onChange={handleChange}
//             onKeyDown={handleKeyDown}
//             type="search"
//             id="search-dropdown"
//             className="z-20 block w-full border border-l-2 border-gray-300 border-l-gray-50  bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:border-l-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
//             placeholder="Enter Search Query..."
//             required
//           />
//           {shouldShowSuggestions && (
//             <div className="absolute top-full left-0 w-full rounded-b-md bg-white shadow-lg">
//               {suggestions.map((suggestion, idx) => (
//                 <div
//                   className="bg-white p-2.5"
//                   key={`suggestion-${idx}`}
//                   onClick={() => handleSelect(idx)}
//                   aria-selected={highlightedIdx === idx}
//                 >
//                   {renderSuggestion(suggestion)}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </form>
//   );
// }
// {
//   /*<button*/
// }
// {
//   /*  type="submit"*/
// }
// {
//   /*  className="border-blue absolute top-0 right-0 border p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"*/
// }
// {
//   /*  onClick={handleSubmit}*/
// }
// {
//   /*>*/
// }
// {
//   /*  <svg*/
// }
// {
//   /*    aria-hidden="true"*/
// }
// {
//   /*    className="h-5 w-5"*/
// }
// {
//   /*    fill="none"*/
// }
// {
//   /*    stroke="currentColor"*/
// }
// {
//   /*    viewBox="0 0 24 24"*/
// }
// {
//   /*    xmlns="http://www.w3.org/2000/svg"*/
// }
// {
//   /*  >*/
// }
// {
//   /*    <path*/
// }
// {
//   /*      strokeLinecap="round"*/
// }
// {
//   /*      strokeLinejoin="round"*/
// }
// {
//   /*      strokeWidth="2"*/
// }
// {
//   /*      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"*/
// }
// {
//   /*    ></path>*/
// }
// {
//   /*  </svg>*/
// }
// {
//   /*  <span className="sr-only">Search</span>*/
// }
// {
//   /*</button>*/
// }
//
// //
// // const [searchInput, setSearchInput] = useState("");
// // const [open, setOpen] = useState(false);
// //
// // const handleChange = (Event: React.ChangeEvent<HTMLInputElement>) => {
// //   setSearchInput(Event.target.value);
// //   // updateSearch(Event.target.value);
// // };
// // const handleDropdownClick = (Event: React.MouseEvent<HTMLElement>) => {
// //   console.log(`Dropdown clicked with ${open.toString()}`);
// //   setOpen(!open);
// // };
// //
// // const handleSubmit = (Event: React.FormEvent<HTMLElement>) => {
// //   Event.preventDefault();
// //   console.log(`Submit clicked with data ${searchInput}`);
// //   props.submissionHandler(searchInput);
// // };
