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
import { prisma } from "../../../server/db";

import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";


export default function AddBuyBackLine(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const buyBackOrdersQuery = api.buybackOrders.getById.useQuery({
    id,
  });
  const booksQuery = api.books.getAll.useQuery({ cursor: null, limit: 100 });
  const router = useRouter();
  const { data } = buyBackOrdersQuery;
  const books = booksQuery?.data?.items ?? [];
  const [bookValue, setBookValue] = useState<{
    label: string;
    id: string;
  } | null>(null);
  const [unitBuybackPrice, setUnitBuybackPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [bookInputValue, setBookInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  //TODO: fix this
  // const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue, { keys: ['label, id'] });
  const addMutation = api.buybackLines.add.useMutation();

  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      if (!bookValue) {
        toast.error("Book is required");
        throw new Error("Book is required");
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
        buybackOrderId: id,
      });
      setTimeout(() => {
        void router.push(
          `/buybacks/${encodeURIComponent(id)}/detail`
        );
      }, 500);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };


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

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });
  const id = context.params?.id as string;

  await ssg.buybackOrders.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const buybackOrders = await prisma.buybackOrder.findMany({
    select: {
      id: true,
    },
  });

  const paths = buybackOrders.map((buybackOrder) => ({
    params: { id: buybackOrder.id },
  }));

  return { paths, fallback: true };
};
