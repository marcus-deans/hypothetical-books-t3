import React, { useState } from "react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../server/api/root";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import superjson from "superjson";
import { api } from "../../../utils/api";
import { useRouter } from "next/router";
import { Autocomplete, TextField } from "@mui/material";
import { FormControl, FormHelperText, FormLabel } from "@mui/joy";
import { matchSorter } from "match-sorter";

export default function AddSalesLine(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const salesReconciliationsQuery = api.salesReconciliations.getAll.useQuery({
    cursor: null,
    limit: 100,
  });
  const booksQuery = api.books.getAllWithAuthorsAndGenre.useQuery({
    cursor: null,
    limit: 100,
  });

  const router = useRouter();
  const salesReconciliations = salesReconciliationsQuery?.data?.items ?? [];
  const books = booksQuery?.data?.items ?? [];
  const [salesValue, setSalesValue] = useState<{
    label: string;
    id: string;
  } | null>(null);
  const [bookValue, setBookValue] = useState<{
    label: string;
    id: string;
  } | null>(null);
  const [unitWholesalePrice, setUnitWholesalePrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [salesInputValue, setSalesInputValue] = useState("");
  const [bookInputValue, setBookInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  //TODO: fix this
  // const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue, { keys: ['label, id'] });
  const addMutation = api.salesLines.add.useMutation();

  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      if (!bookValue || !salesValue) {
        throw new Error("Book and Sales Reconciliation are required");
      }
      const finalUnitWholesalePrice = Number(unitWholesalePrice);
      const finalQuantity = Number(quantity);
      if (
        isNaN(finalUnitWholesalePrice) ||
        isNaN(finalQuantity) ||
        finalUnitWholesalePrice <= 0 ||
        finalQuantity <= 0
      ) {
        throw new Error(
          "Unit Wholesale Price and Quantity must be positive numbers"
        );
      }
      const addResult = addMutation.mutate({
        bookId: bookValue.id,
        quantity: finalQuantity,
        unitWholesalePrice: finalUnitWholesalePrice,
        salesReconciliationId: salesValue.id,
      });
      setTimeout(() => {
        void router.push(`/sales/${encodeURIComponent(salesValue.id)}/detail`);
      }, 500);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const salesReconciliationOptions = salesReconciliations.map(
    (salesReconciliation) => ({
      label: salesReconciliation.date.toLocaleDateString(),
      id: salesReconciliation.id,
    })
  );
  const bookOptions = books.map((book) => ({
    label: `${book.title} (${book.isbn_13})`,
    id: book.id,
    retailPrice: book.retailPrice.toString(),
  }));

  return (
    <div className="pt-6">
      <form className="rounded bg-white px-6 py-6 inline-block">
        <div className="space-y-5">
          <div className="mb-2 block text-lg font-bold text-gray-700">
            Create Purchase Line
          </div>
          <div className="relative space-y-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <div className="col-span-4">
              <div className="space-y-20">
                <div className="flex w-4/5 space-x-10">
                  <FormControl>
                    <FormLabel>Sales Reconciliation</FormLabel>
                    <FormHelperText>
                      Select a sales reconciliation by date
                    </FormHelperText>
                    <Autocomplete
                      options={salesReconciliationOptions}
                      placeholder={"Search sales reconciliations by date"}
                      value={salesValue}
                      onChange={(
                        event,
                        newValue: { label: string; id: string } | null
                      ) => {
                        setSalesValue(newValue);
                      }}
                      onInputChange={(event, newSalesInputValue: string) => {
                        setSalesInputValue(newSalesInputValue);
                      }}
                      sx={{ width: 425 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          inputProps={{
                            ...params.inputProps,
                          }}
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Book</FormLabel>
                    <FormHelperText>Select a book by title</FormHelperText>
                    <Autocomplete
                      options={bookOptions}
                      placeholder={"Search books by title"}
                      value={bookValue}
                      onChange={(
                        event,
                        newValue: { label: string; id: string } | null
                      ) => {
                        setBookValue(newValue);
                        setUnitWholesalePrice(
                          bookOptions.find((book) => book.id === newValue?.id)
                            ?.retailPrice ?? ""
                        );
                      }}
                      onInputChange={(event, newBookInputValue: string) => {
                        setBookInputValue(newBookInputValue);
                      }}
                      sx={{ width: 425 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          inputProps={{
                            ...params.inputProps,
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </div>
                <div className="py-60" />
                <div className="flex space-x-20">
                  <input
                    className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                    id="quantity"
                    name="quantity"
                    type="text"
                    placeholder="Quantity"
                    min="1"
                    // value={quantity}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => setQuantity(event.target.value)}
                    required
                  />
                  <input
                    className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                    id="UnitWholesalePrice"
                    name="UnitWholesalePrice"
                    type="text"
                    placeholder="Unit Wholesale Price"
                    min="0"
                    value={unitWholesalePrice}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => setUnitWholesalePrice(event.target.value)}
                    required
                  />
                </div>
              </div>
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
  await ssg.books.getAllWithAuthorsAndGenre.prefetch({
    cursor: null,
    limit: 100,
  });
  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      // id,
    },
  };
}
