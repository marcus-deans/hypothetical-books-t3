import { useState } from "react";

interface SearchBarProps {
  updateSearch: (input: string) => void;
}

function Searchbar({ updateSearch }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (Event: any) => {
    setSearchInput(Event.target.value);
    updateSearch(Event.target.value);
  };
  const dropdDownClick = (Event: any) => {
    setOpen(!open);
  };

  return (
    <form>
      <div className="flex">
        <button
          id="dropdown-button"
          onClick={dropdDownClick}
          data-dropdown-toggle="dropdown"
          className="z-10 inline-flex flex-shrink-0 items-center border border-gray-300 bg-gray-100 py-2.5 px-4 text-center text-sm font-medium text-gray-900  hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
          type="button"
        >
          Search Parameter{" "}
          <svg
            aria-hidden="true"
            className="ml-1 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        {open ? (
          <div
            id="dropdown"
            className="z-10 hidden w-44 divide-y divide-gray-100 bg-white shadow dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdown-button"
            >
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Book Val1
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Book Val2
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  BookVal3
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Logos
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <></>
        )}
        <div className="relative w-full">
          <input
            onChange={(e) => {
              updateSearch(e.target.value);
            }}
            type="search"
            id="search-dropdown"
            className="z-20 block w-full border border-l-2 border-gray-300 border-l-gray-50  bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:border-l-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
            placeholder="Enter Search Query..."
            required
          />
          <button
            type="submit"
            className="border-blue absolute top-0 right-0 border p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
 
    </div>
</form>

  )
}

export default Searchbar;
