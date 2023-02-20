import React, { useState } from "react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";

export default function AddVendor() {
  const [vendorName, setVendorName] = useState("");
  const addMutation = api.vendors.add.useMutation();

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = event.target.value;
    setVendorName(enteredName);
  };
  const handleSubmit = () => {
    console.log(vendorName);
    addMutation.mutate({ name: vendorName });
    setVendorName("");
    setTimeout(() => {
      void router.push(`/vendors/`);
    }, 500);
  };

  const router = useRouter();

  return (
    <div className="pt-6">
      <div className="pt-6 px-6 rounded-lg bg-white inline-block">
        <div className="items-center">
          <div>
            <div className="input-group relative mb-4 flex w-full flex-wrap items-stretch space-y-5">
              <label className="block text-sm font-bold text-gray-700">
                Vendor Name
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                id="genre"
                type="text"
                placeholder="Vendor Name"
                onChange={inputHandler}
              />
            </div>
            <div className="flex space pb-6">
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
