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
import { Autocomplete , TextField } from "@mui/material";
import { FormControl, FormHelperText, FormLabel } from "@mui/joy";
import { matchSorter } from "match-sorter";

export default function AddPurchaseLine(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const purchaseOrdersQuery = api.purchaseOrders.getAll.useQuery({
    cursor: null,
    limit: 100,
  });
  const booksQuery = api.books.getAll.useQuery({ cursor: null, limit: 100 });

  const router = useRouter();
  const purchaseOrders = purchaseOrdersQuery?.data?.items ?? [];
  const books = booksQuery?.data?.items ?? [];
  const [purchaseValue, setPurchaseValue] = useState<{
    label: string;
    id: string;
  } | null>(null);
  const [bookValue, setBookValue] = useState<{
    label: string;
    id: string;
  } | null>(null);
  const [unitWholesalePrice, setUnitWholesalePrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [purchaseInputValue, setPurchaseInputValue] = useState("");
  const [bookInputValue, setBookInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  //TODO: fix this
  // const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue, { keys: ['label, id'] });
  const addMutation = api.purchaseLines.add.useMutation();

  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      if (!bookValue || !purchaseValue) {
        throw new Error("Book and Purchase Order are required");
      }
      if (
        isNaN(unitWholesalePrice) ||
        isNaN(quantity) ||
        unitWholesalePrice <= 0 ||
        quantity <= 0
      ) {
        throw new Error(
          "Unit Wholesale Price and Quantity must be positive numbers"
        );
      }
      const addResult = addMutation.mutate({
        bookId: bookValue.id,
        quantity: quantity,
        unitWholesalePrice: unitWholesalePrice,
        purchaseOrderId: purchaseValue.id,
      });
      setTimeout(() => {
        void router.push(
          `/purchases/${encodeURIComponent(purchaseValue.id)}/detail`
        );
      }, 500);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const purchaseOrderOptions = purchaseOrders.map((purchaseOrder) => ({
    label: purchaseOrder.date.toLocaleDateString(),
    id: purchaseOrder.id,
  }));
  const bookOptions = books.map((book) => ({
    label: `${book.title} (${book.isbn_13})`,
    id: book.id,
  }));

  return (
    <div className="flex w-full items-center ">
      <form className="mb-4 w-3/4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <div className="mb-4 items-center space-y-5">
          <div className="mb-2 block text-lg font-bold text-gray-700">
            Create Purchase Line
          </div>
          <div className="relative space-y-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <div className="col-span-4">
              <div className="space-y-20">
                <div className="flex w-4/5 space-x-10">
                  <FormControl>
                    <FormLabel>Purchase Order</FormLabel>
                    <FormHelperText>
                      Select a purchase order by date
                    </FormHelperText>
                    <Autocomplete
                      options={purchaseOrderOptions}
                      placeholder={"Search sales reconciliations by date"}
                      value={purchaseValue}
                      onChange={(
                        event,
                        newValue: { label: string; id: string; } | null
                      ) => {
                        setPurchaseValue(newValue);
                      } }
                      onInputChange={(event, newPurchaseInputValue: string) => {
                        setPurchaseInputValue(newPurchaseInputValue);
                      } }
                      sx={{ width: 425 }} 
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          inputProps={{
                            ...params.inputProps
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
                        newValue: { label: string; id: string; } | null
                      ) => {
                        setBookValue(newValue);
                      } }
                      onInputChange={(event, newBookInputValue: string) => {
                        setBookInputValue(newBookInputValue);
                      } }
                      sx={{ width: 425 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          inputProps={{
                            ...params.inputProps
                          }}
                        />
                      )}
                      />
                  </FormControl>
                </div>
                <div className="flex w-4/5 space-x-10">
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
                    ): void => setQuantity(Number(event.target.value))}
                    required
                  />
                  <input
                    className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                    id="UnitWholesalePrice"
                    name="UnitWholesalePrice"
                    type="text"
                    placeholder="Unit Wholesale Price"
                    min="0"
                    // value={unitWholesalePrice}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void =>
                      setUnitWholesalePrice(Number(event.target.value))
                    }
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
  await ssg.purchaseOrders.getAll.prefetch({ cursor: null, limit: 100 });
  await ssg.books.getAll.prefetch({ cursor: null, limit: 100 });
  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      // id,
    },
  };
}
