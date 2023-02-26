import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import type { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { api } from "../../../utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import dayjs from "dayjs";

export default function AddSalesReconciliation() {
  const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addMutation = api.salesReconciliations.add.useMutation();
  const handleDatePickChange = (newValue: Dayjs | null) => {
    setDateValue(newValue);
  };
  const router = useRouter();

  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      if (!dateValue) {
        throw new Error("Date is required");
      }
      const addResult = addMutation.mutate({
        date: dateValue.toDate(),
        salesLines: [],
      });
      setTimeout(() => {
        void router.push("/sales");
      }, 500);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-neutral-50 overflow-hidden pt-6 inline-block">
      <form className="mb-4 items-center rounded bg-white shadow-md px-6 py-3">
        <div className="mb-4 space-y-5">
          <div className="mb-2 block text-lg font-bold text-gray-700">
            Create Sales Reconciliation
          </div>
          <div className="relative space-y-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
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
