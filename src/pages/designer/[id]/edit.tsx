import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import type { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { api } from "../../../utils/api";
import { useRouter } from "next/router";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../server/api/root";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import superjson from "superjson";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
} from "@mui/material";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import type { CustomUser } from "../../../schema/user.schema";
import { prisma } from "../../../server/db";
import dayjs from "dayjs";
import Head from "next/head";
import { toast } from "react-toastify";
import { z } from "zod";
import { useSession } from "next-auth/react";

export default function EditCase(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data: session, status } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const user = session?.user as CustomUser;
  const { id } = props;
  const router = useRouter();
  const caseDetailsQuery = api.cases.getById.useQuery({ id: id });
  console.log(caseDetailsQuery.data);

  const editMutation = api.cases.edit.useMutation();
  const currentName = caseDetailsQuery?.data?.name ?? "";
  const currentWidth = caseDetailsQuery?.data?.width ?? 0;
  const currentShelfCount = caseDetailsQuery?.data?.shelfCount ?? 0;
  const [nameValue, setNameValue] = useState(currentName);
  const [widthValue, setWidthValue] = useState(currentWidth);
  const [shelfCountValue, setShelfCountValue] = useState(currentShelfCount);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      if (isNaN(widthValue) || isNaN(shelfCountValue)) {
        toast.error("Width and Shelf Count must be numbers");
        setIsSubmitting(false);
        return;
      }

      const editResult = editMutation.mutate({
        caseId: id,
        name: nameValue,
        width: widthValue,
        shelfCount: shelfCountValue,
        shelvesIds: [],
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        user: user!,
      });
      setTimeout(() => {
        void router.push(`/designer/`);
      }, 500);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Edit Case</title>
      </Head>
      <div className="pt-6">
        <form className="inline-block rounded bg-white px-6 py-6">
          <div className="space-y-5">
            <div className="mb-2 block text-lg font-bold text-gray-700">
              Edit Case Design
            </div>
            <div className="relative space-y-3">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <div className="col-span-4">
                <div className="space-y-20">
                  <div className="flex justify-center space-x-10">
                    <TextField
                      id="nameValue"
                      name="nameValue"
                      label="Case Name"
                      type="text"
                      sx={{ width: 250 }}
                      value={nameValue}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ): void => setNameValue(event.target.value)}
                      required
                    />
                    <TextField
                      id="width"
                      label="Shelf Width"
                      value={widthValue}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ): void => setWidthValue(Number(event.target.value))}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">inches</InputAdornment>
                        ),
                      }}
                      required
                      sx={{
                        width: 150,
                      }}
                    />
                    <TextField
                      id="shelfCount"
                      label="Shelf Count"
                      value={shelfCountValue}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ): void => setShelfCountValue(Number(event.target.value))}
                      required
                      sx={{
                        width: 150,
                      }}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const cases = await prisma.case.findMany({
    select: {
      id: true,
    },
  });

  const paths = cases.map((caseA) => ({
    params: { id: caseA.id },
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

  await ssg.cases.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
