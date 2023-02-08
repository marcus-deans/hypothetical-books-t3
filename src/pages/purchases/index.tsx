import React from "react";
import Head from "next/head";
import { api } from "../../utils/api";
import { Logger } from "tslog";
import { createInnerTRPCContext } from "../../server/api/trpc";
import { appRouter } from "../../server/api/root";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import superjson from "superjson";
import TableHeader from "../../components/table-components/TableHeader";
import Link from "next/link";
import PurchaseOrderRow from "../../components/table-components/PurchaseOrderRow";
import { Button } from "@mui/material";

export default function sales(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const purchaseOrderQuery =
    api.purchaseOrders.getAllWithOverallMetrics.useQuery({
      cursor: null,
      limit: 50,
    });

  const purchaseOrders = purchaseOrderQuery?.data?.items ?? [];

  const logger = new Logger({ name: "purchaseOrdersLogger" });
  logger.info("purchaseOrders", purchaseOrders); // This is the only line that is different from the Books page

  const tableHeaders = [
    "Date",
    "ID",
    "Vendor",
    "Total Quantity",
    "Total Price",
    "Unique Books",
  ];

  return (
    <>
      <Head>
        <title>Purchases</title>
      </Head>
      <div className="m-5 overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map((tableHeader) => (
                <TableHeader text={tableHeader} key={tableHeader} />
              ))}
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                <div className="flex items-center">Detail</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {purchaseOrders.map((purchaseOrder) => (
              <PurchaseOrderRow
                id={purchaseOrder.purchaseOrder.id}
                key={purchaseOrder.purchaseOrder.id}
                date={purchaseOrder.purchaseOrder.date.toDateString()}
                vendor={purchaseOrder.purchaseOrder.vendor.name}
                totalQuantity={purchaseOrder.totalQuantity}
                totalPrice={purchaseOrder.totalPrice}
                totalUniqueBooks={purchaseOrder.totalUniqueBooks}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Link className="items-end px-6" href="/purchases/add/line" passHref>
      <Button variant="contained" color="primary">Add Purchase Line</Button>
        </Link>

        <Link className="items-end px-6" href="/purchases/add/order" passHref>
      <Button variant="contained" color="primary">Add Purchase Order</Button>
        </Link>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    //eslint-disable-next-line
    transformer: superjson,
  });
  // const id = context.params?.id as string;
  /*
   * Prefetching the `post.byId` query here.
   * `prefetch` does not return the result and never throws - if you need that behavior, use `fetch` instead.
   */
  await ssg.purchaseOrders.getAllWithOverallMetrics.prefetch({
    cursor: null,
    limit: 50,
  });
  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      // id,
    },
  };
}
