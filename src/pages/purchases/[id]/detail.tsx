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
import TableHeader from "../../../components/table-components/TableHeader";
import type { SalesLine } from "@prisma/client";
import DeleteLink from "../../../components/table-components/DeleteLink";
import EditLink from "../../../components/table-components/EditLink";

type DetailProps = {
  totalPrice: string;
  salesLines: (SalesLine & { book: { title: string; isbn_13: string } })[];
  // salesLines: (typeof SalesLine)[];
};

export default function PurchaseOrderDetail(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const purchaseOrderDetailsQuery =
    api.purchaseOrders.getByIdWithOverallMetrics.useQuery({ id });

  // if (router.isFallback) {
  if (purchaseOrderDetailsQuery.status !== "success") {
    return <div>Loading...</div>;
  }

  const { data } = purchaseOrderDetailsQuery;

  const tableHeaders = [
    "Book Title",
    "ISBN 13",
    "Wholesale Price",
    "Quantity",
    "Subtotal",
  ];

  return (
    <table className="w-full border-separate bg-white text-left text-sm text-gray-500">
      <thead className="bg-gray-50">
        <tr>
          {tableHeaders.map((tableHeader) => (
            <TableHeader text={tableHeader} key={tableHeader} />
          ))}
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">
            <div className="flex items-center">Edit</div>
          </th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">
            <div className="flex items-center">Delete</div>
          </th>
          <th>
            <EditLink url={`/purchases/${encodeURIComponent(props.id)}/edit`} />
          </th>
          <th scope="col" className="px-4 py-2 font-normal text-gray-900">
            <DeleteLink
              url={`/purchases/${encodeURIComponent(props.id)}/delete`}
            />
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        {data.purchaseOrderWithOverallMetrics.purchaseLines.map(
          (purchaseLine) => (
            <tr key={purchaseLine.id} className="hover:bg-gray-150">
              <td className="px-4 py-2 font-light">
                {purchaseLine.book.title}
              </td>
              <td className="px-4 py-2 font-light">
                {purchaseLine.book.isbn_13}
              </td>
              <td className="px-4 py-2 font-light">
                {purchaseLine.unitWholesalePrice}
              </td>
              <td className="px-4 py-2 font-light">{purchaseLine.quantity}</td>
              <td className="px-4 py-2 font-light">
                {purchaseLine.unitWholesalePrice * purchaseLine.quantity}
              </td>
              <td className="px-4 py-2 font-light">
                <EditLink
                  url={`/purchases/${encodeURIComponent(
                    props.id
                  )}/${encodeURIComponent(purchaseLine.id)}/edit`}
                />
              </td>
              <td className="px-4 py-2 font-light">
                <DeleteLink
                  url={`/purchases/${encodeURIComponent(
                    props.id
                  )}/${encodeURIComponent(purchaseLine.id)}/delete`}
                />
              </td>
            </tr>
          )
        )}
        <tr className="hover:bg-gray-350">
          <td className="px-4 py-2 font-semibold">Vendor</td>
          <td className="px-4 py-2 font-semibold">
            {data.purchaseOrderWithOverallMetrics.vendor.name}
          </td>
          <td></td>
          <td className="px-4 py-2 font-semibold">Grand Total</td>
          <td className="px-4 py-2 font-medium">{data.totalPrice}</td>
        </tr>
      </tbody>
    </table>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const purchaseOrders = await prisma.purchaseOrder.findMany({
    select: {
      id: true,
    },
  });

  const paths = purchaseOrders.map((purchaseOrder) => ({
    params: { id: purchaseOrder.id },
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

  await ssg.purchaseOrders.getByIdWithOverallMetrics.prefetch({ id });

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
