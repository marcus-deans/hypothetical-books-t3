import type { FormEventHandler, MouseEventHandler } from "react";
import React, { useState } from "react";
import { api } from "../../../utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import type { CustomUser } from "../../../schema/user.schema";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../server/api/root";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import { prisma } from "../../../server/db";
import superjson from "superjson";

export default function ChangeThisPassword(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const [userInfo, setUserInfo] = useState<{
    password: string;
    confirm: string;
  }>({ password: "", confirm: "" });
  const router = useRouter();
  const { id } = props;
  const userDetailsQuery = api.users.getById.useQuery({
    id,
  });
  if (userDetailsQuery.status !== "success") {
    return <div>Loading...</div>;
  }
  const { data } = userDetailsQuery;
  const mutation = api.users.changeUserPassword.useMutation();
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    // validate your userinfo
    e.preventDefault();
    if (!data) {
      alert("User is not Available");
    }
    if (userInfo.password !== userInfo.confirm) {
      alert("Passwords must match");
    } else {
      mutation.mutate({ user: data, password: userInfo.password });
      alert("Successfully Changed Password");
      setTimeout(() => {
        void router.push("/users/" + id + "/detail");
      }, 500);
    }
  };
  return (
    <div className="inline-block w-3/12 space-y-4 p-6 sm:p-8 md:space-y-6">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
        Change Password for {data.name}
      </h1>
      <form className="space-y-4 md:space-y-6" action="#">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            value={userInfo.password}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, password: target.value })
            }
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Confirm Password
          </label>
          <input
            value={userInfo.confirm}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, confirm: target.value })
            }
            type="password"
            name="confirm"
            id="confirm"
            placeholder="••••••••"
            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-gray-900 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
        >
          Submit New Password
        </button>
      </form>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
    },
  });

  const paths = users.map((user) => ({
    params: { id: user.id },
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

  await ssg.users.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
