import React from "react";
import Link from "next/link";
import TableCell from "./TableCell";

type PurchaseOrderRowProps = {
  id: string;
  date: string;
  totalQuantity: number;
  totalPrice: number;
  totalUniqueBooks: number;
};

// const tableHeaders = [
//   "ID",
//   "Date",
//   "Total Quantity",
//   "Total Price",
//   "Unique Books",
// ];
export default function PurchaseOrderRow(props: PurchaseOrderRowProps) {
  const desiredCells = [
    props.id,
    props.totalQuantity,
    props.totalPrice,
    props.totalUniqueBooks,
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
          <div className="font-medium text-gray-700">{props.date}</div>
          <div className="text-gray-400">Date</div>
        </div>
      </th>
      {desiredCells.map((cell) => (
        <TableCell text={cell.toString()} key={cell} />
      ))}
      <td className="px-6 py-4">
        <div className="flex justify-start gap-4">
          <Link
            x-data="{ tooltip: 'Detail' }"
            href={`/sales/${encodeURIComponent(props.id)}/detail`}
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
              <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
            </svg>
          </Link>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-start gap-4">
          <Link
            x-data="{ tooltip: 'Edit' }"
            href={`/sales/${encodeURIComponent(props.id)}/edit`}
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
        </div>
      </td>
    </tr>
  );
}
