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
import { useState } from "react";
import { useRouter } from "next/router";
import { prisma } from "../../../server/db";

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
  const router = useRouter();
  // if (router.isFallback) {
  if (vendorDetailsQuery.status !== "success") {
    return <div>Loading...</div>;
  }
  const { data } = vendorDetailsQuery;

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = event.target.value;
    setVendorName(enteredName);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      const editResult = editMutation.mutate({ id: id, name: vendorName });
      setTimeout(() => {
        void router.push("/vendors");
      }, 500);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full items-center">
      <form className="mb-4 flex w-3/4 items-center rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            {"Vendor Name"}
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="vendor"
            type="text"
            value={vendorName}
            onChange={inputHandler}
          />
        </div>
        <button
          className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 align-middle font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
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
