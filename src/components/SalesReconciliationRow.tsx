import React from "react";
import Link from "next/link";

type SalesReconciliationRowProps = {
  id: string;
  date: string;
};

function SalesReconciliationRow(props: SalesReconciliationRowProps) {
  // const salesReconciliation =
  //   api.salesReconciliations.getByIdWithSalesLineIds.useQuery({
  //     id: props.id,
  //   });
  // const salesLinesIds = salesReconciliation?.data?.salesLines ?? [];
  //
  // const salesLines = salesLinesIds.map((salesLineId) => {
  //   return api.salesLines.getByIdWithBookPrimaries.useQuery(salesLineId);
  // });

  // model SalesLine{
  //   id 				String @id @default(cuid())
  //   book 			Book @relation(fields: [bookId], references: [id])
  //   bookId 		String
  //   quantity 	Int
  //   unitWholesalePrice Float
  //   salesReconciliation		SalesReconciliation @relation(fields: [salesReconciliationId], references: [id])
  //   salesReconciliationId	String
  // }

  const salesLine1 = {
    id: "1",
    bookId: "101",
    book: {
      title: "To Kill a Mockingbird",
      isbn_13: "9780446310789",
    },
    quantity: "10",
    unitWholesalePrice: "10.99",
    salesReconciliationId: "1",
  };

  const salesLine2 = {
    id: "2",
    bookId: "103",
    book: {
      title: "The Hunger Games",
      isbn_13: "9780439023481",
    },
    quantity: "20",
    unitWholesalePrice: "18.99",
    salesReconciliationId: "1",
  };

  const salesLines = [salesLine1, salesLine2];

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
      <td className="px-4 py-2">
        <table className="w-full border-separate bg-white text-left text-sm text-gray-500">
          <thead className="space-x-4 bg-gray-50">
            <tr className="space-x-4 rounded-md">
              <th scope="col" className="px-4 py-2 font-normal text-gray-900">
                Book Title
              </th>
              <th scope="col" className="px-4 py-2 font-normal text-gray-900">
                ISBN 13
              </th>
              <th scope="col" className="px-4 py-2 font-normal text-gray-900">
                Wholesale Price
              </th>
              <th scope="col" className="px-4 py-2 font-normal text-gray-900">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {salesLines.map((salesLine) => (
              <tr className="hover:bg-gray-150">
                <td className="px-4 py-2 font-light">{salesLine.book.title}</td>
                <td className="px-4 py-2 font-light">
                  {salesLine.book.isbn_13}
                </td>
                <td className="px-4 py-2 font-light">
                  {salesLine.unitWholesalePrice}
                </td>
                <td className="px-4 py-2 font-light">{salesLine.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-4">
          {/*TODO:add detail button*/}
          <Link href={`/sales/${encodeURIComponent(props.id)}/detail`}>
            {/*<a x-data="{ tooltip: 'Detail' }" href="#">*/}
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
            {/*</a>*/}
          </Link>
          {/*TODO: add delete button*/}
          <a x-data="{ tooltip: 'Delete' }" href="#">
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
          </a>
          {/*TODO: Add edit button*/}
          <a x-data="{ tooltip: 'Edite' }" href="#">
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
          </a>
        </div>
      </td>
    </tr>
  );
}

export default SalesReconciliationRow;
