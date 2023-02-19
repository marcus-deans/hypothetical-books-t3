import React, { useState } from "react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";
import { useRouter } from "next/router";
import { Autocomplete, TextField } from "@mui/material";
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

export default function EditPurchaseLine(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const id = props.id;
  const lineId = props.lineId;
  const purchaseOrdersQuery = api.purchaseOrders.getAll.useQuery({
    cursor: null,
    limit: 100,
  });
  const purchaseLineQuery = api.purchaseLines.getByIdWithRelations.useQuery({
    id: lineId,
  });
  const booksQuery = api.books.getAll.useQuery({ cursor: null, limit: 100 });

  const router = useRouter();
  const purchaseOrders = purchaseOrdersQuery?.data?.items ?? [];
  const books = booksQuery?.data?.items ?? [];
  const [purchaseValue, setPurchaseValue] = useState<{
    label: string;
    id: string;
  } | null>({
    label: purchaseLineQuery?.data?.purchaseOrder.date.toDateString() ?? "",
    id: purchaseLineQuery?.data?.purchaseOrder.id ?? "",
  });
  const [bookValue, setBookValue] = useState<{
    label: string;
    id: string;
  } | null>({
    label: purchaseLineQuery?.data?.book.title ?? "",
    id: purchaseLineQuery?.data?.book.id ?? "",
  });
  const [unitWholesalePrice, setUnitWholesalePrice] = useState(
    purchaseLineQuery?.data?.unitWholesalePrice ?? 0
  );
  const [quantity, setQuantity] = useState(
    purchaseLineQuery?.data?.quantity ?? 0
  );
  const [purchaseInputValue, setPurchaseInputValue] = useState("");
  const [bookInputValue, setBookInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  //TODO: fix this
  // const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue, { keys: ['label, id'] });
  const editMutation = api.purchaseLines.update.useMutation();

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
      const addResult = editMutation.mutate({
        id: lineId,
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
    label: purchaseOrder.date.toDateString(),
    id: purchaseOrder.id,
  }));
  const bookOptions = books.map((book) => ({
    label: book.title,
    id: book.isbn_13,
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
                      sx={{ width: 425 }} renderInput={(params) => (
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
                    min="1"
                    value={quantity}
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
                    value={unitWholesalePrice}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const purchaseLines = await prisma.purchaseLine.findMany({
    select: {
      id: true,
      purchaseOrder: {
        select: {
          id: true,
        },
      },
    },
  });
  const paths = purchaseLines.map((purchaseLine) => ({
    params: { id: purchaseLine.purchaseOrder.id, lineId: purchaseLine.id },
  }));

  return { paths, fallback: true };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string; lineId: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });
  const id = context.params?.id as string;
  const lineId = context.params?.lineId as string;

  await ssg.purchaseOrders.getAll.prefetch({ cursor: null, limit: 100 });
  await ssg.books.getAll.prefetch({ cursor: null, limit: 100 });
  await ssg.purchaseLines.getByIdWithRelations.prefetch({ id: lineId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
      lineId,
    },
    revalidate: 1,
  };
}
