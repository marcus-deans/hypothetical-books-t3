/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { MouseEventHandler } from "react";
import React, { useState } from "react";
import jsPDF from "jspdf";
import type { RowInput } from "jspdf-autotable";
import autoTable from "jspdf-autotable";
import Head from "next/head";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { api } from "../../../utils/api";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import { appRouter } from "../../../server/api/root";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import superjson from "superjson";
import type { purchaseOrders } from "../../../schema/purchases.schema";
import type { salesReconciliation } from "../../../schema/sales.schema";
import type { book } from "../../../schema/books.schema";
import type { buyBackOrders } from "../../../schema/buybacks.schema";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Planogram(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startDateString, setStartDate] = useState(new Date());
  const [endDateString, setEndDate] = useState(new Date());
  const startDateTemp = new Date(startDateString);
  const startDate = new Date(startDateTemp.getTime() - 90 * 60000); // Offset the dates by 90 minutes in order to get the current day's data
  const endDate = new Date(endDateString);
  const purchaseOrderQuery =
    api.purchaseOrders.getByDateWithOverallMetrics.useQuery(
      {
        startDate: startDate,
        endDate: endDate,
        cursor: null,
        limit: 50,
      },
      { enabled: !!startDate && !!endDate }
    );
  const salesQuery =
    api.salesReconciliations.getByDateWithOverallMetrics.useQuery(
      {
        startDate: startDate,
        endDate: endDate,
        cursor: null,
        limit: 50,
      },
      { enabled: !!startDate && !!endDate }
    );

  const buyBackQuery = api.buybackOrders.getByDateWithOverallMetrics.useQuery(
    {
      startDate: startDate,
      endDate: endDate,
      cursor: null,
      limit: 50,
    },
    { enabled: !!startDate && !!endDate }
  );

  const purchaseOrders: purchaseOrders = purchaseOrderQuery?.data?.items ?? [];
  const salesReconciliations: salesReconciliation =
    salesQuery?.data?.items ?? [];
  const buyBackOrders: buyBackOrders = buyBackQuery?.data?.items ?? [];

  const handleGenerate: MouseEventHandler<HTMLButtonElement> = () => {
    setIsSubmitting(true);
    if (startDate.valueOf() > endDate.valueOf() + 1000 * 60) {
      alert(
        "End Date must be later than Start Date, or the same as Start Date"
      );
      setIsSubmitting(false);
    } else {
      setIsSubmitting(true);
      generateReport(
        startDate,
        endDate,
        purchaseOrders,
        salesReconciliations,
        buyBackOrders
      );
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Head>
        <title>Planogram</title>
      </Head>
      <div className="pt-6">
        <form className="inline-block rounded bg-white px-6 py-6">
          <div className="space-y-5">
            
            <div className="relative space-y-3">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <div className="col-span-4">
                <div className="space-y-20">
                  <div className="flex justify-center space-x-10">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Start Date"
                        inputFormat="MM/DD/YYYY"
                        value={startDate}
                        onChange={(date) => setStartDate(date ?? new Date())}
                        renderInput={(params: JSX.IntrinsicAttributes) => (
                          <TextField {...params} />
                        )}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="End Date"
                        inputFormat="MM/DD/YYYY"
                        value={endDate}
                        onChange={(date) => setEndDate(date ?? new Date())}
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
                onClick={handleGenerate}
              >
                {isSubmitting ? "Generating..." : "Generate Report"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}


