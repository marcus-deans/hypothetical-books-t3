import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { ReactSearchAutocompleteProps } from "react-search-autocomplete/dist/components/ReactSearchAutocomplete";
import Head from "next/head";
import React from "react";
import type { SalesReconciliation } from ".prisma/client";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../server/api/root";
import { createInnerTRPCContext } from "../../server/api/trpc";
import superjson from "superjson";
import { api } from "../../utils/api";
import { getBindingIdentifiers } from "@babel/types";
import keys = getBindingIdentifiers.keys;

export default function AddSaleLine(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const salesReconciliationsQuery = api.salesReconciliations.getAll.useQuery({
    cursor: null,
    limit: 50,
  });

  const salesReconciliations = salesReconciliationsQuery?.data?.items ?? [];
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item: SalesReconciliation) => {
    return (
      <div>
        <span style={{ display: "block", textAlign: "left" }}>
          id: {item.id}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          name: {item.date.toDateString()}
        </span>
      </div>
    );
  };

  return (
    <div>
      <Head>
        <title>Add</title>
      </Head>
      <div className="space-y-5">
        <div className="grid grid-cols-5 gap-3">
          <div className="rounded-lg bg-white py-1 text-center">
            Sales Reconciliation
          </div>
          <div className="col-span-4">
            <ReactSearchAutocomplete<SalesReconciliation>
              items={salesReconciliations}
              fuseOptions={{ keys: ["id", "date"] }}
              placeholder="Search for a sales reconciliation"
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              autoFocus
              formatResult={formatResult}
            />
          </div>
        </div>
        <div className="rounded-xl bg-white py-3 text-center">
          Save Sales Line
        </div>
      </div>
    </div>
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
