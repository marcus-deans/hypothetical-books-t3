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
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function AddBuyBackLine(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const buyBackOrdersQuery = api.buybackOrders.getAll.useQuery({
    cursor: null,
    limit: 100,
  });
  const booksQuery = api.books.getAll.useQuery({ cursor: null, limit: 100 });

  const router = useRouter();
  const buybackOrders = buyBackOrdersQuery?.data?.items ?? [];
  const books = booksQuery?.data?.items ?? [];
  const [buybackValue, setBuybackValue] = useState<{
    label: string;
    id: string;
  } | null>(null);
  const [bookValue, setBookValue] = useState<{
    label: string;
    id: string;
  } | null>(null);
  const [unitBuybackPrice, setUnitBuybackPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [buybackInputValue, setBuybackInputValue] = useState("");
  const [bookInputValue, setBookInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  //TODO: fix this
  // const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue, { keys: ['label, id'] });
  const addMutation = api.buybackLines.add.useMutation();

  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      if (!bookValue || !buybackValue) {
        toast.error("Book and Buyback Order are required");
        throw new Error("Book and Buyback Order are required");
      }
      if (
        isNaN(unitBuybackPrice) ||
        isNaN(quantity) ||
        unitBuybackPrice <= 0 ||
        quantity <= 0
      ) {
        toast.error("Unit Buyback Price and Quantity must be positive numbers");

        throw new Error("Unit Buyback Price and Quantity must be positive numbers");
      
      }
      const addResult = addMutation.mutate({
        bookId: bookValue.id,
        quantity: quantity,
        unitBuybackPrice: unitBuybackPrice,
        buybackOrderId: buybackValue.id,
      });
      setTimeout(() => {
        void router.push(
          `/buybacks/${encodeURIComponent(buybackValue.id)}/detail`
        );
      }, 500);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const buybackOrderOptions = buybackOrders.map((buyBack) => ({
    label: buyBack.date.toLocaleDateString(),
    id: buyBack.id,
  }));
  const bookOptions = books.map((book) => ({
    label: `${book.title} (${book.isbn_13})`,
    id: book.id,
  }));

  return (
    <div className="pt-6">
      <form className="rounded bg-white px-6 py-6 inline-block">
        <div className="space-y-5">
          <div className="mb-2 block text-lg font-bold text-gray-700">
            Create Buyback Line
          </div>
          <div className="relative space-y-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <div className="col-span-4">
              <div className="space-y-20">
                <div className="flex space-x-10 justify-center">
                  <FormControl>
                    <FormLabel>Buyback Order</FormLabel>
                    <FormHelperText>
                      Select a buyback order by date
                    </FormHelperText>
                    <Autocomplete
                      options={buybackOrderOptions}
                      placeholder={"Search buyback orders by date"}
                      value={buybackValue}
                      onChange={(
                        event,
                        newValue: { label: string; id: string } | null
                      ) => {
                        setBuybackValue(newValue);
                      }}
                      onInputChange={(
                        event,
                        newBuybackInputValue: string
                      ) => {
                        setBuybackInputValue(newBuybackInputValue);
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
                <div className="flex space-x-10 justify-center">
                  <FormControl>
                    <FormLabel>Quantity</FormLabel>
                    <input
                      className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                      id="quantity"
                      name="quantity"
                      type="text"
                      placeholder="Quantity"
                      min="1"
                      size={45}
                      // value={quantity}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ): void => setQuantity(Number(event.target.value))}
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Unit Buyback Price</FormLabel>
                    <input
                      className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                      id="UnitBuybackPrice"
                      name="UnitBuybackPrice"
                      type="text"
                      placeholder="Unit Buyback Price"
                      min="0"
                      size={45}
                      // value={unitBuybackPrice}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ): void =>
                        setUnitBuybackPrice(Number(event.target.value))
                      }
                      required
                    />
                  </FormControl>
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
      <ToastContainer></ToastContainer>
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
  await ssg.buybackOrders.getAll.prefetch({ cursor: null, limit: 100 });
  await ssg.books.getAll.prefetch({ cursor: null, limit: 100 });
  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      // id,
    },
  };
}
