import type { GetServerSidePropsContext, GetStaticPaths, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import { prisma } from "../../../server/db";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../server/api/root";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import superjson from "superjson";
import type { InferGetStaticPropsType } from "next";
import { api } from "../../../utils/api";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import StripedDataGrid from "../../../components/table-components/StripedDataGrid";
import React from "react";
import DetailLink from "../../../components/table-components/DetailLink";
import Head from "next/head";
import type { CustomUser } from "../../../schema/user.schema";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@mui/material";

export default function DetailUser(
    props: InferGetStaticPropsType<typeof getStaticProps>
) {
    const { id } = props;
    const genreDetailsQuery = api.users.getById.useQuery({
        id,
    });

    // if (router.isFallback) {
    if (genreDetailsQuery.status !== "success") {
        return <div>Loading...</div>;
    }

    const { data } = genreDetailsQuery;


    return (
        <>
            <Head>
                <title>User Details</title>
            </Head>
            <div className="space mt-3 flex h-3/4 overflow-hidden text-neutral-50">
                <h1 className="inline-block text-2xl">
                    {" "}
                    {`Details for User ${data.name}`}
                    { }
                </h1>
            </div>
            <Link className="items-end px-3" href={`/users/${id}/edit`} passHref>
                <Button
                    className="rounded border border-blue-700 bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
                    variant="contained"
                >
                    Edit User Privilege
                </Button>
            </Link>
            <Link
                className="items-end px-3"
                href={`/users/${id}/changeThisPassword`}
                passHref
            >
                <Button
                    className="rounded border border-blue-700 bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
                    variant="contained"
                >
                    Reset User Password
                </Button>
            </Link>
            <Link
                className="items-end px-3"
                href={`/users/${id}/delete`}
                passHref
            >
                <Button
                    className="rounded border border-blue-700 bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
                    variant="contained"
                >
                    Delete User
                </Button>
            </Link>
            <div className="mt-5 h-3/4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
                <Box>
                    {"This User is " + (data.role == "admin" ? " " : "not ") + "an admin."}
                </Box>
            </div>
        </>
    );
}


export async function getStaticProps(
    context: GetStaticPropsContext<{ id: string }>
) {
    const ssg = createProxySSGHelpers({
        router: appRouter,
        ctx: createInnerTRPCContext({ session: null }),
        //eslint-disable-next-line
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

export const getStaticPaths: GetStaticPaths = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
        },
    });

    const paths = users.map((user) => ({
        params: { id: user.id },
    }));

    console.log(paths);

    return { paths, fallback: true };
};
