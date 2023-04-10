import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import superjson from "superjson";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../server/api/root";
import { api } from "../../../utils/api";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { prisma } from "../../../server/db";
import { InputAdornment, TextField } from "@mui/material";
import Head from "next/head";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditVendor(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const vendorDetailsQuery = api.vendors.getById.useQuery({
    id,
  });
  const editMutation = api.vendors.edit.useMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vendorName, setVendorName] = useState(
    vendorDetailsQuery?.data?.name ?? "Vendor Name"
  );
  const [buybackRate, setBuybackRate] = useState(
    vendorDetailsQuery?.data?.buybackRate.toString() ?? "Vendor Buyback Rate"
  );
  const router = useRouter();
  // if (router.isFallback) {
  if (vendorDetailsQuery.status !== "success") {
    return <div className="text-white">Loading...</div>;
  }
  const { data } = vendorDetailsQuery;

  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      if (!vendorName || !buybackRate) {
        toast.error("Vendor name and buyback rate are required. To not allow buybacks for this vendor, enter value of 0");
        setIsSubmitting(false);
        return;
      }
      const finalBuybackRate = Number(buybackRate);
      if (
        isNaN(finalBuybackRate) ||
        finalBuybackRate < 0 ||
        finalBuybackRate > 100
      ) {
        toast.error("Buyback rate must be a number between 0 and 100, or 0 to represent no buybacks for this vendor");
        setIsSubmitting(false);
        return;
      }
      const finalEdit = editMutation.mutate({
        id: id,
        name: vendorName,
        buybackRate: finalBuybackRate,
      });
      setTimeout(() => {
        void router.push("/vendors");
      }, 500);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Edit Vendor</title>
      </Head>
      <div className="pt-6">
        <form className="inline-block rounded bg-white px-6 py-6">
          <div className="space-y-5">
            <div className="mb-2 block text-lg font-bold text-gray-700">
              Edit Vendor
            </div>
            <div className="relative space-y-3">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <div className="col-span-4">
                <div className="space-y-20">
                  <div className="flex justify-center space-x-10">
                    <TextField
                      id="vendorName"
                      label="Vendor Name"
                      value={vendorName}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ): void => setVendorName(event.target.value)}
                      required
                    />
                    <TextField
                      id="buybackRate"
                      label="Buyback Rate"
                      value={buybackRate}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ): void => setBuybackRate(event.target.value)}
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
      <ToastContainer></ToastContainer>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const vendors = await prisma.vendor.findMany({
    select: {
      id: true,
    },
  });

  const paths = vendors.map((vendor) => ({
    params: { id: vendor.id },
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

  await ssg.vendors.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
