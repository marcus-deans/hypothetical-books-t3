import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import type { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { api } from "../../../utils/api";
import { useRouter } from "next/router";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../server/api/root";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import superjson from "superjson";
import { Autocomplete , FormControl, FormHelperText, FormLabel } from "@mui/material";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { prisma } from "../../../server/db";
import dayjs from "dayjs";

export default function EditBuyBack(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const router = useRouter();
  const buybackDetailsQuery = api.buybackOrders.getByIdWithOverallMetrics.useQuery({id:id});
  const vendorsDetailsQuery = api.vendors.getAll.useQuery({
    cursor: null,
    limit: 100,
  });
  const vendors = vendorsDetailsQuery?.data?.items ?? [];
  ``;
  const editMutation = api.purchaseOrders.edit.useMutation();
  const currentDate =
    buybackDetailsQuery?.data?.buybackOrderWithOverallMetrics.date ??
    new Date();

  const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs(currentDate));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vendorValue, setVendorValue] = useState<{
    label: string;
    id: string;
  } | null>({
    label:
    buybackDetailsQuery?.data?.buybackOrderWithOverallMetrics.vendor.name ??
      "",
    id:
    buybackDetailsQuery?.data?.buybackOrderWithOverallMetrics.vendor.id ??
      "",
  });
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
      const addResult = editMutation.mutate({
        id: id,
        date: dateValue.toDate(),
        vendorId: vendorValue.id,
        purchaseLines: [],
      });
      setTimeout(() => {
        void router.push(`/purchases/${encodeURIComponent(id)}/detail`);
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
    <div className="flex w-full items-center ">
      <form className="mb-4 w-3/4 items-center rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <div className="mb-4 items-center space-y-5">
          <div className="mb-2 block text-lg font-bold text-gray-700">
            Edit BuyBack
          </div>
          <div className="relative space-y-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <div className="col-span-4 flex space-x-20">
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
              <FormControl>
                <FormLabel>Vendor Name</FormLabel>
                <FormHelperText>Select a vendor by name</FormHelperText>
                <Autocomplete
                  options={vendorOptions}
                  placeholder={"Select a vendor by name"}
                  value={vendorValue}
                  onChange={(
                    event,
                    newValue: { label: string; id: string; } | null
                  ) => {
                    setVendorValue(newValue);
                  } }
                  onInputChange={(event, newInputValue: string) => {
                    setVendorInputValue(newInputValue);
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
        </div>
      </form>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const purchaseOrders = await prisma.purchaseOrder.findMany({
    select: {
      id: true,
    },
  });

  const paths = purchaseOrders.map((purchaseOrder) => ({
    params: { id: purchaseOrder.id },
  }));

  return { paths, fallback: true };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });
  const id = context.params?.id as string;

  await ssg.purchaseOrders.getByIdWithOverallMetrics.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
