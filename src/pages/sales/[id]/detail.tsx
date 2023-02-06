import React from "react";
import { api } from "../../../utils/api";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { prisma } from "../../../server/db";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../server/api/root";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import superjson from "superjson";
type DetailProps = {
  totalPrice: string;
  salesLines: (SalesLine & { book: { title: string; isbn_13: string } })[];
  // salesLines: (typeof SalesLine)[];
};
import Link from "next/link";
import { SalesLine } from "@prisma/client";

export default function Detail(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const salesDetailsQuery =
    api.salesReconciliations.getByIdWithOverallMetrics.useQuery({ id });

  // if (router.isFallback) {
  if (salesDetailsQuery.status !== "success") {
    return <div>Loading...</div>;
  }

  const { data } = salesDetailsQuery;

  return (
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
          <th scope="col" className="px-4 py-2 font-normal text-gray-900">
            {/*TODO: add delete button*/}
            <Link x-data="{ tooltip: 'Delete' }" href="#">
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
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        {data.salesReconciliationWithOverallMetrics.salesLines.map(
          (salesLine) => (
            <tr key={salesLine.id} className="hover:bg-gray-150">
              <td className="px-4 py-2 font-light">{salesLine.book.title}</td>
              <td className="px-4 py-2 font-light">{salesLine.book.isbn_13}</td>
              <td className="px-4 py-2 font-light">
                {salesLine.unitWholesalePrice}
              </td>
              <td className="px-4 py-2 font-light">{salesLine.quantity}</td>
            </tr>
          )
        )}
        <tr className="hover:bg-gray-350">
          <td className="px-4 py-2 font-semibold">Grand Total</td>
          <td className="px-4 py-2 font-medium">{data.totalPrice}</td>
        </tr>
      </tbody>
    </table>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const salesReconciliations = await prisma.salesReconciliation.findMany({
    select: {
      id: true,
    },
  });

  const paths = salesReconciliations.map((salesReconciliation) => ({
    params: { id: salesReconciliation.id },
  }));

  console.log(paths);

  return { paths, fallback: true };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });
  const id = context.params?.id as string;

  await ssg.salesReconciliations.getByIdWithOverallMetrics.prefetch({ id });

  // const totalPrice = salesReconciliation?.data?.totalPrice.toString();

  // const salesLines =
  //   salesReconciliation?.data?.salesReconciliationWithOverallMetrics
  //     ?.salesLines ?? [];
  //
  // return { props: { totalPrice, salesLines }, revalidate: 20 };
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
