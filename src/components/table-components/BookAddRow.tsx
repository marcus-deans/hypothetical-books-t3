// const tableHeaders = [
//   "ID",
//   "Name",
//   "Edit",
//   "Delete"
// ];

import React from "react";
import TableCell from "./TableCell";

type BookAddRowProps = {
  title: string;
  authors: string[];
  publishedDate: string;
  isbn_13: string;
  pageCount: number;
  publisher: string | null;
  categories: string[] | null;
};

// const tableHeaders = [
//   "Title",
//   "Author",
//   "Published Date",
//   "ISBN-13",
//   "Page Count",
//   "Publisher",
// ]
export default function BookAddRow(props: BookAddRowProps) {
  const desiredCells = [
    props.publishedDate,
    props.isbn_13,
    props.pageCount,
    props.publisher,
    props.categories,
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
      {desiredCells.map((cell, index) => (
        <TableCell
          text={cell?.toString() ?? ""}
          key={cell?.toString() ?? index}
        />
      ))}
    </tr>
  );
}
