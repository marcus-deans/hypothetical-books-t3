import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import type { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

export default function AddSales {
  const [dateValue, setDateValue] = useState<Dayjs | null>();
  const handleDatePickChange = (newValue: Dayjs | null) => {
    setDateValue(newValue);
  };
  return (
    <div className="w-full max-w-xs items-center ">
      <form className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Sale Information
          </label>
          <div className="relative max-w-sm">
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
            <ReactSearchAutocomplete items={[]} placeholder="Enter Book" />
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="genre"
              type="text"
              placeholder="Quantity"
            />
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="genre"
              type="text"
              placeholder="Price"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 align-middle font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="button"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};