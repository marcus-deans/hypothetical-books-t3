import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
} from "@mui/material";

import dayjs from "dayjs";
import Head from "next/head";
import { toast } from "react-toastify";
import { z } from "zod";
import { useSession } from "next-auth/react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { createInnerTRPCContext } from "../../server/api/trpc";
import type { CustomUser } from "../../schema/user.schema";
import { appRouter } from "../../server/api/root";
import { api } from "../../utils/api";

export default function AddCase(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { data: session, status } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const user = session?.user as CustomUser;
  const router = useRouter();

  const addMutation = api.cases.add.useMutation();
  const casesQuery = api.cases.getAll.useQuery({
    cursor: null,
    limit: 50,
  });

  const casesWithShelves = casesQuery?.data?.items ?? [];


  const [nameValue, setNameValue] = useState("");
  const [widthValue, setWidthValue] = useState(0);
  const [shelfCountValue, setShelfCountValue] = useState(7);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    
    setIsSubmitting(true);
    try {
      if (isNaN(widthValue) || isNaN(shelfCountValue)) {
        toast.error("Width and Shelf Count must be numbers");
        setIsSubmitting(false);
        return;
      }
      if(casesWithShelves.some(obj => obj.name === nameValue)){
        toast.error("A case with this name already exists");
        setIsSubmitting(false);
        return;
      }
      //Create shelfCountValue new blank shelves and link them
      // const blankShelves = []
      // for(let i =0; i < shelfCountValue; i++){
      //   edit.mutate({
      //     caseId: id,
      //     spaceUsed: 0,
      //     bookDetails: [],
      //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      //     user: user!,
      //   });
      // }
      const addResult = addMutation.mutate({
        name: nameValue,
        width: widthValue,
        shelfCount: shelfCountValue,
        shelvesIds: [],
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        user: user!,
      });
      setTimeout(() => {
        void router.push("/designer");
      }, 500);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Add Case</title>
      </Head>
      <div className="pt-6">
        <form className="inline-block rounded bg-white px-6 py-6">
          <div className="space-y-5">
            <div className="mb-2 block text-lg font-bold text-gray-700">
              Add Case Design
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    //eslint-disable-next-line
    transformer: superjson,
  });
  // const id = context.params?.id as string;
  /*
   * Prefetching the `post.byId` query here.
   * `prefetch` does not return the result and never throws - if you need that behavior, use `fetch` instead.
   */
  await ssg.cases.getAll.prefetch({
    cursor: null,
    limit: 100,
  });
  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      // id,
    },
  };
}
