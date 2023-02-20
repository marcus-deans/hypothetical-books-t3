import React from "react";
import TableCell from "./TableCell";
import DetailLink from "./DetailLink";

type PurchaseOrderRowProps = {
  id: string;
  date: string;
  vendor: string;
  totalQuantity: number;
  totalPrice: number;
  totalUniqueBooks: number;
};

// const tableHeaders = [
//   "ID",
//   "Date",
//   "Vendor",
//   "Total Quantity",
//   "Total Price",
//   "Unique Books",
// ];
export default function PurchaseOrderRow(props: PurchaseOrderRowProps) {
  const desiredCells = [
    props.vendor,
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
          <DetailLink
            url={`/purchases/${encodeURIComponent(props.id)}/detail`}
          />
        </div>
      </td>
    </tr>
  );
}
