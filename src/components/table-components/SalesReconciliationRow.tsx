import React from "react";
import Link from "next/link";
import { api } from "../../utils/api";

type SalesReconciliationRowProps = {
  id: string;
  date: string;
};

function SalesReconciliationRow(props: SalesReconciliationRowProps) {
  const salesReconciliationWithMetrics =
    api.salesReconciliations.getByIdWithOverallMetrics.useQuery({
      id: props.id,
    });

  // model SalesLine{
  //   id 				String @id @default(cuid())
  //   book 			Book @relation(fields: [bookId], references: [id])
  //   bookId 		String
  //   quantity 	Int
  //   unitWholesalePrice Float
  //   salesReconciliation		SalesReconciliation @relation(fields: [salesReconciliationId], references: [id])
  //   salesReconciliationId	String
  // }

  // const salesLine1 = {
  //   id: "1",
  //   bookId: "101",
  //   book: {
  //     title: "To Kill a Mockingbird",
  //     isbn_13: "9780446310789",
  //   },
  //   quantity: "10",
  //   unitWholesalePrice: "10.99",
  //   salesReconciliationId: "1",
  // };
  //
  // const salesLine2 = {
  //   id: "2",
  //   bookId: "103",
  //   book: {
  //     title: "The Hunger Games",
  //     isbn_13: "9780439023481",
  //   },
  //   quantity: "20",
  //   unitWholesalePrice: "18.99",
  //   salesReconciliationId: "1",
  // };
  //
  // const salesLines = [salesLine1, salesLine2];

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
          <div className="font-medium text-gray-700">{props.id}</div>
          <div className="text-gray-400">ID</div>
        </div>
      </th>
      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
          {props.date}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
          {salesReconciliationWithMetrics?.data?.totalQuantity.toString() ??
            "0"}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
          {salesReconciliationWithMetrics?.data?.totalPrice.toString() ?? "0"}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
          {salesReconciliationWithMetrics?.data?.totalUniqueBooks.toString() ??
            "0"}
        </span>
      </td>
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
    </tr>
  );
}

export default SalesReconciliationRow;
