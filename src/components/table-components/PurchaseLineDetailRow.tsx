import React from "react";
import TableCell from "./TableCell";

type PurchaseLineDetailRowProps = {
  title: string;
  authors: string[];
  isbn_13: string;
  quantity: number;
  unitWholesalePrice: number;
  salesReconciliationId: string;
};

export default function PurchaseLineDetailRow(
  props: PurchaseLineDetailRowProps
) {
  // const tableHeaders = [
  //   "Book Title",
  //   "Book Author",
  //   "ISBN-13",
  //   "Quantity",
  //   "Unit Wholesale Price",
  //   "Sales Reconciliation ID",
  // ];
  const desiredCells = [
    props.isbn_13,
    props.quantity,
    props.unitWholesalePrice,
    props.quantity * props.unitWholesalePrice,
    props.salesReconciliationId,
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
    </tr>
  );
}
