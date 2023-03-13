import React, { useState } from "react";
import type {
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../server/api/root";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import superjson from "superjson";
import { api } from "../../../utils/api";
import { useRouter } from "next/router";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { FormControl, FormHelperText, FormLabel } from "@mui/joy";
import Head from "next/head";
import { toast, ToastContainer } from "react-toastify";
import { prisma } from "../../../server/db";
import "react-toastify/dist/ReactToastify.css";

export default function AddPurchaseLine(
  props: InferGetStaticPropsType<typeof getStaticProps>

) {
  const { id } = props;
  const purchaseOrdersQuery = api.purchaseOrders.getById.useQuery({
    id
  });
  const booksQuery = api.books.getAll.useQuery({ cursor: null, limit: 100 });

  const router = useRouter();
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
  const [bookInputValue, setBookInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  //TODO: fix this
  // const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue, { keys: ['label, id'] });
  const addMutation = api.purchaseLines.add.useMutation();

  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      if (!bookValue) {
        toast.error("Book is required")
        throw new Error("Book is required");
      }
      if (
        isNaN(unitWholesalePrice) ||
        isNaN(quantity) ||
        unitWholesalePrice <= 0 ||
        quantity <= 0
      ) {
        toast.error("Unit Wholesale Price and Quantity must be positive numbers");
        throw new Error(
          "Unit Wholesale Price and Quantity must be positive numbers"
        );
      }
      const addResult = addMutation.mutate({
        bookId: bookValue.id,
        quantity: quantity,
        unitWholesalePrice: unitWholesalePrice,
        purchaseOrderId: id,
      });
      setTimeout(() => {
        void router.push(
          `/purchases/${encodeURIComponent(id)}/detail`
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
    <>
      <div className="pt-6">
        <form className="inline-block rounded bg-white px-6 py-6">
          <div className="mb-2 block text-lg font-bold text-gray-700">
            Create Purchase Line
          </div>
          <div className="relative space-y-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <div className="col-span-4">
              <div className="space-y-20">
                <div className="flex justify-center space-x-10">
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
                    id="UnitWholesalePrice"
                    name="UnitWholesalePrice"
                    label="Unit Wholesale Price"
                    type="text"
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => setUnitWholesalePrice(Number(event.target.value))}
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
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });
  const id = context.params?.id as string;

  await ssg.purchaseOrders.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
export const getStaticPaths: GetStaticPaths = async () => {
  const purchaseOrders = await prisma.purchaseOrder.findMany({
    select: {
      id: true,
    },
  });

  const paths = purchaseOrders.map((purchaseOrders) => ({
    params: { id: purchaseOrders.id },
  }));

  return { paths, fallback: true };
};
