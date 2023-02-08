import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Head from "next/head";
import React, { useState } from "react";
import type { Book, SalesReconciliation } from ".prisma/client";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../server/api/root";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import superjson from "superjson";
import { api } from "../../../utils/api";
import type { Dayjs } from "dayjs";
import { router } from "next/router";

export default function AddSalesLine(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const salesReconciliationsQuery = api.salesReconciliations.getAll.useQuery({
    cursor: null,
    limit: 100,
  });
  const booksQuery = api.books.getAll.useQuery({ cursor: null, limit: 100 });

  const salesReconciliations = salesReconciliationsQuery?.data?.items ?? [];
  const books = booksQuery?.data?.items ?? [];
  const [dateValue, setDateValue] = useState<Dayjs | null>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addMutation = api.salesLines.add.useMutation();

  const [state, setState] = useState({
    bookId: "",
    quantity: 1,
    unitWholesalePrice: 0,
    salesReconciliationId: "",
    salesSearchString: "",
    bookSearchString: "",
  });

  const handleOnSearchBook = (string: string, results: Book[]) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
    setState({ ...state, bookSearchString: string });
  };

  const handleOnSearchSalesReconciliation = (
    string: string,
    results: SalesReconciliation[]
  ) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
    setState({ ...state, salesSearchString: string });
  };

  const handleOnHover = () => {
    console.log("hovered");
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      if (!dateValue) {
        throw new Error("Date is required");
      }
      if (!state.bookId || !state.salesReconciliationId) {
        throw new Error("Book and Sales Reconciliation are required");
      }
      const addResult = addMutation.mutate({
        bookId: state.bookId,
        quantity: state.quantity,
        unitWholesalePrice: state.unitWholesalePrice,
        salesReconciliationId: state.salesReconciliationId,
      });
      setTimeout(() => {
        void router.push(
          `/sales/${encodeURIComponent(state.salesReconciliationId)}`
        );
      }, 500);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const handleOnSelectSalesReconciliation = (item: SalesReconciliation) => {
    console.log(item.id);
    // the item selected
    setState({ ...state, salesSearchString: " " });
    setState({ ...state, salesReconciliationId: item.id });
  };

  const handleOnSelectBook = (item: Book) => {
    console.log(item.title);
    console.log(item.id);
    setState({ ...state, bookSearchString: " " });

    // the item selected
    setState({ ...state, bookId: item.id });
  };

  const formatResultSalesReconciliation = (item: SalesReconciliation) => {
    return (
      <div>
        <span style={{ display: "block", textAlign: "left" }}>
          id: {item.id}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          date: {item.date.toDateString()}
        </span>
      </div>
    );
  };

  const formatResultBook = (item: Book) => {
    return (
      <div>
        <span style={{ display: "block", textAlign: "left" }}>
          title: {item.title}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          isbn-13: {item.isbn_13}
        </span>
      </div>
    );
  };

  return (
    <div className="flex w-full items-center ">
      <form className="mb-4 w-3/4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <div className="mb-4 items-center space-y-5">
          <div className="mb-2 block text-lg font-bold text-gray-700">
            Create Sales Line
          </div>
          <div className="relative space-y-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <div className="col-span-4">
              <ReactSearchAutocomplete<SalesReconciliation>
                items={salesReconciliations}
                fuseOptions={{ keys: ["id", "date"] }}
                placeholder="Search for a sales reconciliation"
                inputSearchString={state.salesSearchString}
                onSelect={handleOnSelectSalesReconciliation}
                onSearch={handleOnSearchSalesReconciliation}
                onFocus={handleOnFocus}
                onClear={handleOnClear}
                onHover={handleOnHover}
                styling={{ zIndex: 4 }} //allowing results to extend over box below
                autoFocus
                formatResult={formatResultSalesReconciliation}
              />
            </div>
            {/*<div className="col-span-4">*/}
            {/*  <ReactSearchAutocomplete<Book>*/}
            {/*    items={books}*/}
            {/*    fuseOptions={{ keys: ["title", "isbn_13"] }}*/}
            {/*    placeholder="Search for a book"*/}
            {/*    inputSearchString={state.bookSearchString}*/}
            {/*    onSelect={handleOnSelectBook}*/}
            {/*    onSearch={handleOnSearchBook}*/}
            {/*    onFocus={handleOnFocus}*/}
            {/*    onClear={handleOnClear}*/}
            {/*    onHover={handleOnHover}*/}
            {/*    autoFocus*/}
            {/*    formatResult={formatResultBook}*/}
            {/*  />*/}
            {/*</div>*/}
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="quantity"
              name="quantity"
              type="text"
              placeholder="Quantity"
              min="1"
              onChange={handleChange}
              required
            />
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="UnitWholesalePrice"
              name="UnitWholesalePrice"
              type="text"
              placeholder="Unit Wholesale Price"
              min="0"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 align-middle font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="button"
            onClick={handleSubmit}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
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
  await ssg.salesReconciliations.getAll.prefetch({ cursor: null, limit: 100 });
  await ssg.books.getAll.prefetch({ cursor: null, limit: 100 });
  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      // id,
    },
  };
}
