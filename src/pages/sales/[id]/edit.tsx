import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { api } from "../../../utils/api";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { prisma } from "../../../server/db";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../server/api/root";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import superjson from "superjson";
import { useRouter } from "next/router";
import Head from "next/head";

export default function EditSalesReconciliation(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const salesDetailsQuery =
    api.salesReconciliations.getByIdWithOverallMetrics.useQuery({ id });

  const currentDate =
    salesDetailsQuery?.data?.salesReconciliationWithOverallMetrics.date ??
    new Date();

  const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs(currentDate));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const editMutation = api.salesReconciliations.update.useMutation();
  const handleDatePickChange = (newValue: Dayjs | null) => {
    setDateValue(newValue);
  };

  const [state, setState] = useState({
    quantity: 1,
    price: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      if (!dateValue) {
        throw new Error("Date is required");
      }
      const editResult = editMutation.mutate({
        id: id,
        date: dateValue.toDate(),
        salesLines: [],
      });
      setTimeout(() => {
        void router.push(`/sales/${encodeURIComponent(id)}/detail`);
      }, 500);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Edit Sales Reconciliation</title>
      </Head>
      <div className="pt-6">
        <form className="rounded bg-white px-6 py-6 inline-block">
          <div className="space-y-5">
            <div className="mb-2 block text-lg font-bold text-gray-700">
              Edit Sales Record
            </div>
            <div className="relative space-y-3">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <div className="col-span-4">
                <div className="space-y-20">
                  <div className="flex space-x-10">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Sale Date"
                        inputFormat="MM/DD/YYYY"
                        value={dateValue}
                        onChange={handleDatePickChange}
                        renderInput={(params: JSX.IntrinsicAttributes) => (
                          <TextField {...params} />
                        )}
                      />
                    </LocalizationProvider>
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
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const salesReconciliations = await prisma.salesReconciliation.findMany({
    select: {
      id: true,
    },
  });

  const paths = salesReconciliations.map((salesReconciliation) => ({
    params: { id: salesReconciliation.id },
  }));

  console.log(paths);

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

  await ssg.salesReconciliations.getByIdWithOverallMetrics.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
