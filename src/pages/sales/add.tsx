import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const add = () => {
    const [dateValue, setDateValue] = useState<Dayjs | null>()
    const handleDatePickChange = (newValue: Dayjs | null) => {
        setDateValue(newValue);
      };
  return (
    <div className="w-full max-w-xs items-center ">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Sale Information
      </label>
      <div className="relative max-w-sm">
  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
  </div>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DesktopDatePicker
          label="Sale Date"
          inputFormat="MM/DD/YYYY"
          value={dateValue}
          onChange={handleDatePickChange}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
    <ReactSearchAutocomplete items={[]} placeholder="Enter Book" />
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="genre" type="text" placeholder="Quantity" />
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="genre" type="text" placeholder="Price" />
    </div>
    </div>
    <div className="flex items-center justify-between">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline align-middle" type="button">
        Submit
      </button>
    </div>
  </form>
</div>
  )
}
export default add
