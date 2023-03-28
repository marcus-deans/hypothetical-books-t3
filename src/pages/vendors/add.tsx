import React, { useState } from "react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { InputAdornment, TextField } from "@mui/material";
import Head from "next/head";

export default function AddVendor() {
  const [vendorName, setVendorName] = useState("");
  const [buybackRate, setBuybackRate] = useState("");
  const addMutation = api.vendors.add.useMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    try {
      setIsSubmitting(true);
      if (!vendorName || !buybackRate) {
        alert("Vendor name and buyback rate are required");
        return;
      }
      const finalBuybackRate = Number(buybackRate);
      if (
        isNaN(finalBuybackRate) ||
        finalBuybackRate < 0 ||
        finalBuybackRate >= 100
      ) {
        alert("Buyback rate must be a number between 0 and 100, or 0 to represent no buybacks for this vendor");
        return;
      }
      addMutation.mutate({ name: vendorName, buybackRate: finalBuybackRate });
      setVendorName("");
      setTimeout(() => {
        void router.push(`/vendors/`);
      }, 500);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Add Vendor</title>
      </Head>
      <div className="pt-6">
        <form className="rounded bg-white px-6 py-6 inline-block">
          <div className="space-y-5">
            <div className="mb-2 block text-lg font-bold text-gray-700">
              Add Vendor
            </div>
            <div className="relative space-y-3">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <div className="col-span-4">
                <div className="space-y-20">
                  <div className="flex space-x-10 justify-center">
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
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 align-middle font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
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
