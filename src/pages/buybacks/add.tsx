import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import type { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../server/api/root";
import { createInnerTRPCContext } from "../../server/api/trpc";
import superjson from "superjson";
import { Autocomplete, TextField } from "@mui/material";
import { FormControl, FormHelperText, FormLabel } from "@mui/joy";
import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import type { CustomUser } from "../../schema/user.schema";

export default function AddBuybackOrder(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { data: session, status } = useSession();
  const user = session?.user as CustomUser;
  const router = useRouter();
  const vendorsDetailsQuery = api.vendors.getAllWithBuybackPolicy.useQuery({
    cursor: null,
    limit: 100,
  });
  const vendors = vendorsDetailsQuery?.data?.items ?? [];
  ``;
  const addMutation = api.buybackOrders.add.useMutation();

  const booksQuery = api.books.getAll.useQuery({ cursor: null, limit: 100 });
  const books = booksQuery?.data?.items ?? [];
  const bookOptions = books.map((book) => ({
    label: `${book.title} (${book.isbn_13})`,
    id: book.id,
  }));
  const [bookValue, setBookValue] = useState<{
    label: string;
    id: string;
  } | null>(null);
  const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs());
  const [bookInputValue, setBookInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vendorValue, setVendorValue] = useState<{
    label: string;
    id: string;
  } | null>(null);
  const [vendorInputValue, setVendorInputValue] = useState("");
  const handleDatePickChange = (newValue: Dayjs | null) => {
    setDateValue(newValue);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      if (!dateValue || !vendorValue) {
        toast.error("Date and vendor are required");
        throw new Error("Date and vendor are required");
      }
      const addResult = addMutation.mutate({
        date: dateValue.toDate(),
        vendorId: vendorValue.id,
        buybackLines: [],
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        user: user!,
      });
      setTimeout(() => {
        void router.push("/buybacks");
      }, 500);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const vendorOptions = vendors.map((vendor) => ({
    label: vendor.name,
    id: vendor.id,
  }));

  return (
    <>
      <Head>
        <title>Create Buyback Order</title>
      </Head>
      <div className="inline-block overflow-hidden pt-6">
        <form className="mb-4 items-center rounded bg-white px-6 py-3 shadow-md">
          <div className="mb-4 space-y-5">
            <div className="mb-2 block text-lg font-bold">
              Create Buyback Order
            </div>
            <div className="relative space-y-3">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Purchase Date"
                  inputFormat="MM/DD/YYYY"
                  value={dateValue}
                  onChange={handleDatePickChange}
                  renderInput={(params: JSX.IntrinsicAttributes) => (
                    <TextField {...params} />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div className="flex justify-center">
              <FormControl>
                <Autocomplete
                  options={vendorOptions}
                  value={vendorValue}
                  onChange={(
                    event,
                    newValue: { label: string; id: string } | null
                  ) => {
                    setVendorValue(newValue);
                  }}
                  onInputChange={(event, newInputValue: string) => {
                    setVendorInputValue(newInputValue);
                  }}
                  sx={{ width: 425 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                      }}
                      label="Select a Vendor by Name"
                    />
                  )}
                />
              </FormControl>
            </div>
            <div className="space flex">
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
  await ssg.vendors.getAllWithBuybackPolicy.prefetch({
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
