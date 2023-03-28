import React, { useState } from "react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";
import { useRouter } from "next/router";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { FormControl, FormHelperText, FormLabel } from "@mui/joy";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { prisma } from "../../../../server/db";
import { api } from "../../../../utils/api";
import { appRouter } from "../../../../server/api/root";
import { createInnerTRPCContext } from "../../../../server/api/trpc";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditBuybackLine(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const id = props.id;
  const lineId = props.lineId;
  const buybackOrdersQuery = api.buybackOrders.getAll.useQuery({
    cursor: null,
    limit: 100,
  });
  const buybackLineQuery = api.buybackLines.getByIdWithRelations.useQuery({
    id: lineId,
  });
  const booksQuery = api.books.getAll.useQuery({ cursor: null, limit: 100 });

  const router = useRouter();
  const buybackOrders = buybackOrdersQuery?.data?.items ?? [];
  const books = booksQuery?.data?.items ?? [];
  const [buybackValue, setBuybackValue] = useState<{
    label: string;
    id: string;
  } | null>({
    label: buybackLineQuery?.data?.buybackOrder.date.toDateString() ?? "",
    id: buybackLineQuery?.data?.buybackOrder.id ?? "",
  });
  const [bookValue, setBookValue] = useState<{
    label: string;
    id: string;
  } | null>({
    label: buybackLineQuery?.data?.book.title ?? "",
    id: buybackLineQuery?.data?.book.id ?? "",
  });
  const [unitBuybackPrice, setUnitBuybackPrice] = useState(
    buybackLineQuery?.data?.unitBuybackPrice ?? 0
  );
  const [quantity, setQuantity] = useState(
    buybackLineQuery?.data?.quantity ?? 0
  );
  const [buybackInputValue, setBuybackInputValue] = useState("");
  const [bookInputValue, setBookInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  //TODO: fix this
  // const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue, { keys: ['label, id'] });
  const editMutation = api.buybackLines.update.useMutation();

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
        throw new Error(
          "Unit Buyback Price and Quantity must be positive numbers"
        );
      }
      const addResult = editMutation.mutate({
        id: lineId,
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

  const buybackOrderOptions = buybackOrders.map((buybackOrder) => ({
    label: buybackOrder.date.toDateString(),
    id: buybackOrder.id,
  }));
  const bookOptions = books.map((book) => ({
    label: book.title,
    id: book.isbn_13,
  }));

  return (
    <>
      <Head>
        <title>Edit Buyback Line</title>
      </Head>
      <div className="pt-6">
        <form className="inline-block rounded bg-white px-6 py-6">
          <div className="space-y-5">
            <div className="mb-2 block text-lg font-bold text-gray-700">
              Edit Buyback Line
            </div>
            <div className="relative space-y-3">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <div className="col-span-4">
                <div className="space-y-20">
                  <div className="flex justify-center space-x-10">
                    <FormControl>
                      <Autocomplete
                        options={buybackOrderOptions}
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
                            label="Select a Buyback Order by Date"
                          />
                        )}
                      />
                    </FormControl>
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
                    <FormControl>
                      <TextField
                        id="quantity"
                        name="quantity"
                        label="Quantity"
                        type="number"
                        sx={{ width: 425 }}
                        value={quantity}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ): void => setQuantity(Number(event.target.value))}
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <TextField
                        id="UnitBuybackPrice"
                        name="UnitBuybackPrice"
                        label="Unit Buyback Price"
                        type="text"
                        sx={{ width: 425 }}
                        value={unitBuybackPrice}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ): void =>
                          setUnitBuybackPrice(Number(event.target.value))
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                        }}
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
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const buybackLines = await prisma.buybackLine.findMany({
    select: {
      id: true,
      buybackOrder: {
        select: {
          id: true,
        },
      },
    },
  });
  const paths = buybackLines.map((buybackLine) => ({
    params: { id: buybackLine.id, lineId: buybackLine.id },
  }));

  return { paths, fallback: true };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string; lineId: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });
  const id = context.params?.id as string;
  const lineId = context.params?.lineId as string;

  await ssg.buybackOrders.getAll.prefetch({ cursor: null, limit: 100 });
  await ssg.books.getAll.prefetch({ cursor: null, limit: 100 });
  await ssg.buybackLines.getByIdWithRelations.prefetch({ id: lineId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
      lineId,
    },
    revalidate: 1,
  };
}
