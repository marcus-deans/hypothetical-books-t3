import React, { useState } from "react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
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
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditSalesLine(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const id = props.id;
  const lineId = props.lineId;
  const salesReconciliationsQuery = api.salesReconciliations.getAll.useQuery({
    cursor: null,
    limit: 100,
  });
  const salesLineQuery = api.salesLines.getByIdWithRelations.useQuery({
    id: lineId,
  });
  const booksQuery = api.books.getAll.useQuery({ cursor: null, limit: 100 });

  const router = useRouter();
  const salesReconciliations = salesReconciliationsQuery?.data?.items ?? [];
  const books = booksQuery?.data?.items ?? [];
  const [salesValue, setSalesValue] = useState<{
    label: string;
    id: string;
  } | null>({
    label: salesLineQuery?.data?.salesReconciliation.date.toDateString() ?? "",
    id: salesLineQuery?.data?.salesReconciliation.id ?? "",
  });
  const [bookValue, setBookValue] = useState<{
    label: string;
    id: string;
  } | null>({
    label: salesLineQuery?.data?.book.title ?? "",
    id: salesLineQuery?.data?.book.id ?? "",
  });
  const [unitWholesalePrice, setUnitWholesalePrice] = useState(
    salesLineQuery?.data?.unitWholesalePrice ?? 0
  );
  const [quantity, setQuantity] = useState(salesLineQuery?.data?.quantity ?? 0);
  const [salesInputValue, setSalesInputValue] = useState("");
  const [bookInputValue, setBookInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  //TODO: fix this
  // const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue, { keys: ['label, id'] });
  const editMutation = api.salesLines.update.useMutation();

  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      if (!bookValue || !salesValue) {
        throw new Error("Book and Sales Reconciliation are required");
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
        salesReconciliationId: salesValue.id,
      });
      setTimeout(() => {
        void router.push(`/sales/${encodeURIComponent(salesValue.id)}/detail`);
      }, 500);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      toast.error(`${error}`);
      setIsSubmitting(false);
    }
  };

  const salesReconciliationOptions = salesReconciliations.map(
    (salesReconciliation) => ({
      label: salesReconciliation.date.toDateString(),
      id: salesReconciliation.id,
    })
  );
  const bookOptions = books.map((book) => ({
    label: book.title,
    id: book.isbn_13,
  }));

  return (
    <>
      <Head>
        <title>Edit Sales Line</title>
      </Head>
      <div className="pt-6">
        <form className="inline-block rounded bg-white px-6 py-6">
          <div className="space-y-5">
            <div className="mb-2 block text-lg font-bold text-gray-700">
              Edit Sales Line
            </div>
            <div className="relative space-y-3">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <div className="col-span-4">
                <div className="space-y-20">
                  <div className="flex justify-center space-x-10">
                    <FormControl>
                      <Autocomplete
                        options={salesReconciliationOptions}
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
                            label="Select a Sales Record by Date"
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
                        type="text"
                        value={quantity}
                        sx={{ width: 425 }}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ): void => setQuantity(Number(event.target.value))}
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <TextField
                        id="UnitWholesalePrice"
                        name="UnitWholesalePrice"
                        label="Unit Wholesale Price"
                        type="text"
                        value={unitWholesalePrice}
                        sx={{ width: 425 }}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ): void =>
                          setUnitWholesalePrice(Number(event.target.value))
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
  const salesLines = await prisma.salesLine.findMany({
    select: {
      id: true,
      salesReconciliation: {
        select: {
          id: true,
        },
      },
    },
  });
  const paths = salesLines.map((salesLine) => ({
    params: { id: salesLine.salesReconciliation.id, lineId: salesLine.id },
  }));

  console.log(paths);

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

  await ssg.salesReconciliations.getAll.prefetch({ cursor: null, limit: 100 });
  await ssg.books.getAll.prefetch({ cursor: null, limit: 100 });
  await ssg.salesLines.getByIdWithRelations.prefetch({ id: lineId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
      lineId,
    },
    revalidate: 1,
  };
}
