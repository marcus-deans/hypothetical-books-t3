import React from "react";
import Head from "next/head";
import SalesReconciliationRow from "../components/SalesReconciliationRow";

function sales() {
  return (
    <>
      <Head>
        <title>Sales</title>
      </Head>
      <div className="m-5 overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Title
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Date
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Dud
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Sales Lines
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900"
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            <SalesReconciliationRow
              id={"5436"}
              date={"01-05-2023"}
              title={"Purchase 1"}
              salesLinesIds={["123", "456", "789"]}
            />
          </tbody>
        </table>
      </div>
    </>
  );
}

export default sales;
