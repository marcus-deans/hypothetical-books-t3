import React from "react";
import { api } from "../../../utils/api";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { prisma } from "../../../server/db";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../../server/api/root";
import { createInnerTRPCContext } from "../../../server/api/trpc";
import superjson from "superjson";
import DeleteLink from "../../../components/table-components/DeleteLink";
import Box from "@mui/material/Box";
import StripedDataGrid from "../../../components/table-components/StripedDataGrid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@mui/material";
import { CustomUser } from "../../../schema/user.schema";
import { useSession } from "next-auth/react";

export default function CaseDetail(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const casesDetailsQuery = api.cases.getById.useQuery({ id });

  // if (router.isFallback) {
  if (casesDetailsQuery.status !== "success") {
    return <div className="text-white">Loading...</div>;
  }
  const addMutation = api.shelves.add.useMutation();
  const { data: session, status } = useSession();
  const user = session?.user as CustomUser; 
  const { data } = casesDetailsQuery;
  //Populate default shelves
  // if(data.shelves.length !== data.shelfCount){
  //   console.log("here")
  //   addMutation.mutate({
  //     caseId: id,
  //     spaceUsed: 0,
  //     bookDetails: [],
  //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //     user: user!,
  //   });
  // }
  
  const columns: GridColDef[] = [
    {
      field: "shelf",
      headerName: "Shelf Design",
      headerClassName: "header-theme",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="text-blue-600">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions */}
            <a href={`/designer/${id}/${params.row.id}`}>
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
              {params.row.id}{" "}
            </a>
          </div>
        );
      },
    },
    {
      field: "spaceUsed",
      headerName: "Space Used (inches)",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      minWidth: 200,
    },
    {
      field: "numberBooks",
      headerName: "Number Of Books",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      type: "number",
      minWidth: 150,
    },
    {
      field: "books",
      headerName: "Books",
      headerClassName: "header-theme",
      align: "left",
      headerAlign: "left",
      flex: 1,
      renderCell: (params) => {
        type BookDetail = { id: string; title: string };
        return (
          <div>
            {/* eslint-disable */}
            {params.row.books.map((book: BookDetail) => (
              <a className="text-blue-600" href={`/books/${book.id}/detail`}>
                {book.title}
                {", "}
              </a>
            ))}
            {/* eslint-enable */}
          </div>
        );
      },
      minWidth: 150,
    },
    {
      field: "delete",
      headerName: "Delete",
      headerClassName: "header-theme",
      maxWidth: 70,
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
        <DeleteLink url={`/designer/${id}/${params.id}/delete`} />
      ),
    },
  ];
  const rows = data.shelves.map((shelf) => {
    const bookDetails = shelf.booksOnShelf.map((bookOnShelf) => {
      return {
        id: bookOnShelf.book.id,
        title: bookOnShelf.book.title,
      };
    });

    return {
      id: shelf.id,
      caseId: shelf.caseId,
      spaceUsed: shelf.spaceUsed,
      books: bookDetails,
      numberBooks: bookDetails.length,
    };
  });

  return (
    <>
      <Head>
        <title>Case Details</title>
      </Head>
      <div className="space mt-3 flex h-3/4 overflow-hidden text-neutral-50">
        <h1 className="inline-block text-2xl">
          {" "}
          {`Case ${
            data.name
          } - Last edited at ${data.editedAt.toLocaleDateString()}`}{" "}
        </h1>
      </div>
      <div className="space flex pt-3">
        <Link className="items-end pr-3" href={`/designer/${id}/add`} passHref>
          <Button
            className="rounded border border-blue-700 bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
            variant="contained"
          >
            Add Shelf
          </Button>
        </Link>
        <Link
          className="items-end px-3"
          href={`/designer/${id}/delete`}
          passHref
        >
          <Button
            className="rounded border border-blue-700 bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
            variant="contained"
          >
            Delete Case
          </Button>
        </Link>
        <Link
          className="items-end px-3"
          href={`/designer/${id}/saveas`}
          passHref
        >
          <Button
            className="rounded border border-blue-700 bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
            variant="contained"
          >
            Save As 
          </Button>
        </Link>
        <Link
          className="items-end px-3"
          href={`/designer/${id}/planogram`}
          passHref
        >
          <Button
            className="rounded border border-blue-700 bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
            variant="contained"
          >
            Generate Planogram
          </Button>
        </Link>
      </div>
      <div className="mt-5 h-3/4 overflow-hidden rounded-t-lg border border-gray-200 bg-white shadow-md">
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

export const getStaticPaths: GetStaticPaths = async () => {
  const casesList = await prisma.case.findMany({
    select: {
      id: true,
    },
  });

  const paths = casesList.map((caseA) => ({
    params: { id: caseA.id },
  }));

  console.log(paths);

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
