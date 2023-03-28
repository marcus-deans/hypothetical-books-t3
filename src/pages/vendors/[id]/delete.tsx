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
import DeletePane from "../../../components/DeletePane";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { prisma } from "../../../server/db";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteVendor(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;

  const vendorDetailsQuery = api.vendors.getById.useQuery({
    id,
  });
  const vendorCountQuery = api.vendors.getAllWithOverallMetrics.useQuery({
    cursor: null,
  });
  const { data } = vendorDetailsQuery;

  const vendorsWithOverallMetrics = vendorCountQuery?.data?.items ?? [];
  const currVendorCount = vendorsWithOverallMetrics.find(
    (item) => item.vendor.name === data?.name ?? ""
  )?.purchaseOrderCount;

  const deleteMutation = api.vendors.delete.useMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  // if (router.isFallback) {
  if (vendorDetailsQuery.status !== "success") {
    return <div>Loading...</div>;
  }

  const handleDelete = () => {
    console.log(currVendorCount);
    if (currVendorCount && currVendorCount > 0) {
      toast.error(
        "This vendor has associated purchase orders, so it can not be deleted."
      );
      return;
    }
    setIsDeleting(true);
    try {
      const deleteResult = deleteMutation.mutate({ id: id });
      setTimeout(() => {
        void router.push("/vendors");
      }, 500);
    } catch (error) {
      console.log(error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Delete Vendor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DeletePane
        itemIdentifier={data?.name ?? id}
        itemName={"Vendor"}
        isDeleting={isDeleting}
        handleDelete={handleDelete}
        cancelUrl={`/vendors/`}
      />
      <ToastContainer></ToastContainer>
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
