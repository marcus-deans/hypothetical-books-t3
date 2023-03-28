import React, { useState } from "react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../server/api/root";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import superjson from "superjson";
import { api } from "../../../utils/api";
import { useRouter } from "next/router";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { FormControl, FormHelperText, FormLabel } from "@mui/joy";
import { toast, ToastContainer } from "react-toastify";
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
  const router = useRouter();
  const buyBackOrder = buyBackOrdersQuery?.data;
  const purchaseOrderQuery =
    api.purchaseOrders.getByVendorWithOverallMetrics.useQuery({
      vendorId: buyBackOrder?.vendorId ?? "",
      cursor: null,
      limit: 100,
    });
  const purchaseOrders = purchaseOrderQuery?.data?.items ?? [];
  // From all purchase orders, get all of the books
  const allBooks = purchaseOrders.flatMap((purchaseOrder) =>
    purchaseOrder.purchaseOrder.purchaseLines.map(
      (purchaseLine) => purchaseLine.book
    )
  );
  // Filter out duplicate books
  const books = allBooks.filter(
    (book, index, self) => self.findIndex((b) => b.id === book.id) === index
  );
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

        throw new Error(
          "Unit Buyback Price and Quantity must be positive numbers"
        );
      }
      const addResult = addMutation.mutate({
        bookId: bookValue.id,
        quantity: quantity,
        unitBuybackPrice: unitBuybackPrice,
        buybackOrderId: id,
      });
      setTimeout(() => {
        void router.push(`/buybacks/${encodeURIComponent(id)}/detail`);
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
    <>
      <Head>
        <title>Create Buyback Line</title>
      </Head>
      <div className="pt-6">
        <form className="inline-block rounded bg-white px-6 py-6">
          <div className="mb-2 block text-lg font-bold text-gray-700">
            Create Buyback Line
          </div>
          <div className="relative space-y-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <div className="col-span-4">
              <div className="space-y-20">
                <div className="flex justify-center space-x-10">
                  <FormControl>
                    <Autocomplete
                      options={bookOptions}
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
                          label="Select a Book by Title"
                        />
                      )}
                    />
                  </FormControl>
                </div>
                <div className="flex justify-center space-x-10">
                  <TextField
                    id="quantity"
                    name="quantity"
                    label="Quantity"
                    type="text"
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => setQuantity(Number(event.target.value))}
                    required
                  />
                  <TextField
                    id="UnitBuybackPrice"
                    name="UnitBuybackPrice"
                    label="Unit Buyback Price"
                    type="text"
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => setUnitBuybackPrice(Number(event.target.value))}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    required
                  />
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
    </>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createInnerTRPCContext({ session: null }),
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
