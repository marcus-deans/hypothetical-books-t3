import React, { useState } from "react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { InputAdornment, TextField } from "@mui/material";

export default function AddVendor() {
  const [vendorName, setVendorName] = useState("");
  const [buybackRate, setBuybackRate] = useState("");
  const addMutation = api.vendors.add.useMutation();

  const handleSubmit = () => {
    console.log(vendorName);
    if (!vendorName || !buybackRate) {
      alert("Vendor name and buyback rate are required");
      return;
    }
    const finalBuybackRate = Number(buybackRate);
    if (
      isNaN(finalBuybackRate) ||
      finalBuybackRate <= 0 ||
      finalBuybackRate >= 100
    ) {
      alert("Buyback rate must be a number between 0 and 100");
      return;
    }
    addMutation.mutate({ name: vendorName, buybackRate: finalBuybackRate });
    setVendorName("");
    setTimeout(() => {
      void router.push(`/vendors/`);
    }, 500);
  };

  const router = useRouter();

  return (
    <div className="pt-6">
      <div className="inline-block rounded-lg bg-white px-6 pt-6">
        <div className="items-center">
          <div>
            <div className="input-group relative mb-4 flex w-full flex-wrap items-stretch space-y-5">
              <label className="block text-sm font-bold text-gray-700">
                Vendor Name
              </label>
              <TextField
                id="vendorName"
                label="Vendor Name"
                value={vendorName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                  setVendorName(event.target.value)
                }
                required
              />
              <TextField
                id="buybackRate"
                label="Buyback Rate"
                value={buybackRate}
                onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                  setBuybackRate(event.target.value)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                required
              />
            </div>
            <div className="space flex pb-6">
              <button
                className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 align-middle font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
