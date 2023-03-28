import Head from "next/head";
import React from "react";
import { api } from "../../utils/api";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../server/api/root";
import { createInnerTRPCContext } from "../../server/api/trpc";
import superjson from "superjson";
import Link from "next/link";
import { Button } from "@mui/material";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import EditLink from "../../components/table-components/EditLink";
import DeleteLink from "../../components/table-components/DeleteLink";
import Box from "@mui/material/Box";
import StripedDataGrid from "../../components/table-components/StripedDataGrid";
import DetailLink from "../../components/table-components/DetailLink";
import { getSession, useSession } from "next-auth/react";
import type { CustomUser } from "../../schema/user.schema";

export default function UserList(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { data: session, status } = useSession();
  const user = session?.user as CustomUser;
  const userQuery = api.users.getAll.useQuery({
    cursor: null,
    limit: 50,
  });

  const userList = userQuery?.data?.items ?? [];

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "User ID",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      width: 210,
    },
    {
      field: "name",
      headerName: "Username",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="text-blue-600">
            {/*eslint-disable-next-line @typescript-eslint/no-unsafe-member-access*/}
            <a href={`/users/${params.id}/detail`}>{params.row.name} </a>
          </div>
        );
      },
    },
    {
      field: "role",
      headerName: "Role",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "string",
      minWidth: 100,
    },
  ];

  const rows = userList.map((userList) => {
    return {
      id: userList.id,
      name: userList.name,
      role: userList.role,
    };
  });

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <div className="space mt-3 flex h-3/4 overflow-hidden text-neutral-50">
        <h1 className="inline-block text-2xl"> Users </h1>
        <Link
          className="ml-2 inline-block text-2xl text-blue-600"
          href="/users/add"
        >
          {" "}
          +{" "}
        </Link>
      </div>

      <div className="mt-5 h-3/4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
        <Box
          sx={{
            height: "auto",
            "& .header-theme": {
              backgroundColor: "rgba(56, 116, 203, 0.35)",
            },
            "& .MuiDataGrid-cell--textLeft": {
              textAlign: "left",
            },
          }}
        >
          <StripedDataGrid
            rows={rows}
            columns={columns}
            components={{
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              Toolbar: GridToolbar,
            }}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
            }}
            pageSize={10}
            rowsPerPageOptions={[10]}
            autoHeight={true}
            rowHeight={40}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            getRowClassName={(params) =>
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
          />
        </Box>
      </div>
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const user = session?.user as CustomUser;
  if (!user || user.role != "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
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
  await ssg.users.getAll.prefetch({
    cursor: null,
    limit: 50,
  });
  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      // id,
    },
  };
}
