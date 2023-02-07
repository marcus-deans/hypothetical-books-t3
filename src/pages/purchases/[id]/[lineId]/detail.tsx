import React from "react";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import superjson from "superjson";
import { api } from "../../../../utils/api";
import TableHeader from "../../../../components/table-components/TableHeader";
import DeleteLink from "../../../../components/table-components/DeleteLink";
import EditLink from "../../../../components/table-components/EditLink";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../../server/api/root";
import { createInnerTRPCContext } from "../../../../server/api/trpc";
import { prisma } from "../../../../server/db";
import PurchaseLineDetailRow from "../../../../components/table-components/PurchaseLineDetailRow";

export default function Detail(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { lineId } = props;
  const salesLineDetailsQuery =
    api.salesLines.getByIdWithBookPrimaries.useQuery({ id: lineId });

  // if (router.isFallback) {
  if (salesLineDetailsQuery.status !== "success") {
    return <div>Loading...</div>;
  }

  const { data } = salesLineDetailsQuery;

  const tableHeaders = [
    "Book Title",
    "Book Author",
    "ISBN-13",
    "Quantity",
    "Unit Wholesale Price",
    "Total Price",
    "Sales Reconciliation ID",
  ];

  return (
    <table className="w-full border-separate bg-white text-left text-sm text-gray-500">
      <thead className="space-x-4 bg-gray-50">
        <tr className="space-x-4 rounded-md">
          {tableHeaders.map((tableHeader) => (
            <TableHeader text={tableHeader} key={tableHeader} />
          ))}
          <th scope="col" className="px-4 py-2 font-normal text-gray-900">
            {/*TODO: add delete button*/}
            <DeleteLink
              url={`/sales/[id]/${encodeURIComponent(props.lineId)}/edit`}
            />
            {/*TODO: Add edit button*/}
            <EditLink
              url={`/sales/[id]/${encodeURIComponent(props.lineId)}/edit`}
            />
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        <PurchaseLineDetailRow
          key={data.id}
          title={data.book.title}
          isbn_13={data.book.isbn_13}
          authors={data.book.authors.map((author) => author.name)}
          quantity={data.quantity}
          unitWholesalePrice={data.unitWholesalePrice}
          salesReconciliationId={data.salesReconciliationId}
        />
      </tbody>
    </table>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const salesLines = await prisma.salesLine.findMany({
    select: {
      id: true,
    },
  });

  const paths = salesLines.map((salesLine) => ({
    params: { id: salesLine.id },
  }));

  console.log(paths);

  return { paths, fallback: true };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ lineId: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    //eslint-disable-next-line
    transformer: superjson,
  });
  const lineId = context.params?.lineId as string;

  await ssg.purchaseLines.getById.prefetch({ id: lineId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      lineId,
    },
    revalidate: 1,
  };
}
