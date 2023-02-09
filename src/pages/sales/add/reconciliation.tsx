import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import type { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { api } from "../../../utils/api";
import { router } from "next/client";
import Autocomplete from "@mui/joy/Autocomplete";


export default function AddSalesReconciliation() {
  const [dateValue, setDateValue] = useState<Dayjs | null>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookSearch, setBookSearch] = useState("");

  const addMutation = api.salesReconciliations.add.useMutation();
  const handleDatePickChange = (newValue: Dayjs | null) => {
    setDateValue(newValue);
  };

  const [state, setState] = useState({
    quantity: 0,
    price: 0,
    book: 1
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
    console.log(state)
  };

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
    <div className="flex w-full items-center ">
      <form className="mb-4 w-3/4 items-center rounded bg-white px-8 pt-6 pb-8 shadow-md">
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

        <form className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Unit Retail Price
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="genre"
            type="text"
            name="price"
            placeholder="Unit Retail Price"
            onChange={handleChange}
          />
                    <label className="mb-2 block text-sm font-bold text-gray-700">
            Quantity
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="genre"
            type="text"
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
          />
        </div>
      </form>
      <Autocomplete
                      options={[]}
                      name = "book"
                      placeholder={"Search for Book"}
                      onChange={(
                        event,
                        newValue: { label: string; id: string } | null
                      ) => {
                        setBookSearch(newValue[]);
                      }}
                      onInputChange={(event, newSalesInputValue: string) => {
                        setSalesInputValue(newSalesInputValue);
                      }}
                      sx={{ width: 425 }}
                    />


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
