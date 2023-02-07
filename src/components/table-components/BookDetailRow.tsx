import React from "react";
import Link from "next/link";
import TableCell from "./TableCell";

type BookDetailRowProps = {
  id: string;
  title: string;
  isbn_13: string;
  isbn_10: string;
  authors: string[];

  retailPrice: number;
  genre: string;
  inventoryCount: number;
  publisher: string;
  pageCount: number;
  publicationYear: number;
  dimensions: string;
};

//    const tableHeaders = [
//     "Title",
//     "Author",
//     "ISBN",
//     "Retail Price",
//     "Genre",
//     "Inventory Count",
//     "Publisher",
//     "Page Count",
//     "Publication Year",
//     "Purchases",
//     "Sales",
//     "Actions"
//   ];
export default function BookDetailRow(props: BookDetailRowProps) {
  // const tableHeaders = ["Title", "Author", "ISBN", "Retail Price", "Genre", "Inventory Count","View Detail"];
  const desiredCells = [
    props.isbn_13,
    props.isbn_10,
    props.retailPrice,
    props.genre,
    props.inventoryCount,
    props.publisher,
    props.pageCount,
    props.publicationYear,
    props.dimensions,
  ];

  return (
    <tr className="hover:bg-gray-50">
      <th className="flex items-center gap-3 px-6 py-4 font-normal text-gray-900">
        <div className="relative h-10 w-10">
          <img
            className="h-full w-full rounded-full object-cover object-center"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
        </div>
        <div className="text-sm">
          <div className="font-medium text-gray-700">{props.title}</div>
          <div className="text-gray-400">Title</div>
        </div>
      </th>
      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
          {[...props.authors]}
        </span>
      </td>
      {desiredCells.map((cell) => (
        <TableCell text={cell.toString()} key={cell} />
      ))}
      <td className="px-6 py-4">
        {/*TODO: add delete button*/}
        <Link x-data="{ tooltip: 'Delete' }" href="src/components#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
            x-tooltip="tooltip"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </Link>
        {/*TODO: Add edit button*/}
        <Link
          x-data="{ tooltip: 'Edite' }"
          href={`/books/${encodeURIComponent(props.id)}/edit`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
            x-tooltip="tooltip"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </Link>
      </td>
    </tr>
  );
}
