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
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../server/api/root";
import { createInnerTRPCContext } from "../../server/api/trpc";
import superjson from "superjson";
import { Autocomplete, TextField } from "@mui/material";
import { FormControl, FormHelperText, FormLabel } from "@mui/joy";
import dayjs from "dayjs";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { CustomUser } from "../../schema/user.schema";

export default function AddPurchaseOrder(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { data: session, status } = useSession();
  const user = session?.user as CustomUser;
  const router = useRouter();
  const vendorsDetailsQuery = api.vendors.getAll.useQuery({
    cursor: null,
    limit: 100,
  });
  const vendors = vendorsDetailsQuery?.data?.items ?? [];
  ``;
  const addMutation = api.purchaseOrders.add.useMutation();

  const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs());
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
        throw new Error("Date and vendor are required");
      }
      const addResult = addMutation.mutate({
        date: dateValue.toDate(),
        vendorId: vendorValue.id,
        purchaseLines: [],
        user: user!,
      });
      setTimeout(() => {
        void router.push("/purchases");
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
        <title>Create Purchase Order</title>
      </Head>
      <div className="inline-block overflow-hidden pt-6">
        <form className="mb-4 items-center rounded bg-white px-6 py-3 shadow-md">
          <div className="mb-4 space-y-5">
            <div className="mb-2 block text-lg font-bold">
              Create Purchase Order
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
                <FormLabel>Vendor Name</FormLabel>
                <FormHelperText>Select a vendor by name</FormHelperText>
                <Autocomplete
                  options={vendorOptions}
                  placeholder={"Select a vendor by name"}
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
  await ssg.vendors.getAll.prefetch({ cursor: null, limit: 100 });
  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      // id,
    },
  };
}
