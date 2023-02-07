import React from "react";
import Head from "next/head";
import SalesReconciliationRow from "../../components/table-components/SalesReconciliationRow";
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

export default function sales(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  // const salesReconciliations =
  //   api.salesReconciliations.getAll.useQuery({ cursor: null, limit: 50 })?.data
  //     ?.items ?? [];
  const salesReconciliationsQuery = api.salesReconciliations.getAll.useQuery({
    cursor: null,
    limit: 50,
  });

  const salesReconciliations = salesReconciliationsQuery?.data?.items ?? [];

  const logger = new Logger({ name: "salesReconciliationsLogger" });
  logger.info("salesReconciliations", salesReconciliations); // This is the only line that is different from the Books page
  console.log("salesReconciliations", salesReconciliations);

  const tableHeaders = [
    "Title",
    "Date",
    "Total Quantity",
    "Total Price",
    "Unique Books",
  ];

  return (
    <>
      <Head>
        <title>Sales</title>
      </Head>
      <div className="m-5 overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map((tableHeader) => (
                <TableHeader text={tableHeader} key={tableHeader} />
              ))}
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                <div className="flex items-center">View Detail</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {salesReconciliations.map((salesReconciliation) => (
              <SalesReconciliationRow
                id={salesReconciliation.id}
                key={salesReconciliation.id}
                date={salesReconciliation.date.toString()}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center  bg-white">
        <Link className="px-6" href="/sales/add-saleline">
          Add Sale Line
        </Link>
        <Link className="px-6" href="/sales/add-salereconciliation">
          Add Sale Reconciliation
        </Link>
      </div>
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
  await ssg.salesReconciliations.getAll.prefetch({ cursor: null, limit: 50 });
  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      // id,
    },
  };
}
