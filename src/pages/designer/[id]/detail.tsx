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
import type { CustomUser } from "../../../schema/user.schema";
import { useSession } from "next-auth/react";
import jsPDF from "jspdf";
import type { RowInput } from "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { longFormatter } from "../../../utils/formatters";
import type { Book, BookOnShelf, Shelf } from "@prisma/client";

interface FlatDisplayBook {
  id: string;
  title: string;
  author: string;
  isbn_10: string;
  isbn_13: string;
  displayCount: number;
}

type ShelfQueryData = (Shelf & {
  booksOnShelf: (BookOnShelf & { book: Book })[];
})[];

export default function CaseDetail(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const casesDetailsQuery = api.cases.getById.useQuery({ id });
  const { data: session, status } = useSession();

  // if (router.isFallback) {
  if (casesDetailsQuery.status !== "success") {
    return <div className="text-white">Loading...</div>;
  }
  const addMutation = api.shelves.add.useMutation();
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
  const caseWidth = data.width;
  const displayedBooks = data.shelves.map((shelf) => shelf.booksOnShelf).flat();
  console.log(displayedBooks);
  const filteredBooks = displayedBooks.map(
    ({ book: { id, title, isbn_13, isbn_10 }, displayCount, author }) => {
      return {
        id: id,
        title: title,
        author: author,
        isbn_10: isbn_10 ?? "N/A",
        isbn_13: isbn_13,
        displayCount: displayCount,
      } as FlatDisplayBook;
    }
  );

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
    {
      field: "valid",
      headerName: "Valid",
      headerClassName: "header-theme",
      maxWidth: 70,
      align: "center",
      sortable: false,
      filterable: false,
    },
  ];
  const rows = data.shelves.map((shelf) => {
    const bookDetails = shelf.booksOnShelf.map((bookOnShelf) => {
      return {
        id: bookOnShelf.book.id,
        title: bookOnShelf.book.title,
      };
    });
    const isValid = shelf.spaceUsed > caseWidth ? "No" : "Yes";
    return {
      id: shelf.id,
      caseId: shelf.caseId,
      spaceUsed: shelf.spaceUsed,
      books: bookDetails,
      numberBooks: bookDetails.length,
      valid: isValid,
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
          {`Case ${data.name} - Last edited at ${longFormatter.format(
            data.editedAt
          )}`}{" "}
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
        <Button
          className="rounded border border-blue-700 bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
          variant="contained"
          onClick={() => {
            generatePlanogram(data.name, data.shelves, filteredBooks);
          }}
        >
          Generate Planogram
        </Button>
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

function generatePlanogram(
  name: string,
  shelves: ShelfQueryData,
  displayedBooks: FlatDisplayBook[]
) {
  const doc = new jsPDF();

  autoTable(doc, {
    body: [
      [
        {
          content: name,
          styles: {
            halign: "left",
            fontSize: 20,
            textColor: "#ffffff",
          },
        },
        {
          content: "Planogram",
          styles: {
            halign: "right",
            fontSize: 20,
            textColor: "#ffffff",
          },
        },
      ],
    ],
    theme: "plain",
    styles: {
      fillColor: "#3366ff",
    },
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Date: " + longFormatter.format(new Date()),
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Books Included",
          styles: {
            halign: "left",
            fontSize: 14,
          },
        },
      ],
    ],
    theme: "plain",
  });

  // Create a new object to store the concatenated entries
  const concatenatedBooks: { [key: string]: ConcatenatedBook } = {};

  interface displayedBook {
    title: string;
    author: string;
    isbn_10: string;
    isbn_13: string;
    displayCount: number;
  }

  interface ConcatenatedBook {
    title: string;
    author: string;
    isbn_10: string;
    isbn_13: string;
    displayCount: number;
  }

  // Loop through each book in the array

  displayedBooks.forEach((book: displayedBook) => {
    const concatenatedBook = concatenatedBooks[book.title];
    if (concatenatedBook) {
      concatenatedBook.displayCount += book.displayCount;
    } else {
      concatenatedBooks[book.title] = { ...book };
    }
  });

  const tableVals: ConcatenatedBook[] = Object.values(concatenatedBooks);

  //Inputs in array format
  const tableAllBooks: RowInput[] = [];
  // displayedBooks.forEach((book: any) => {

  tableVals.forEach((book) => {
    const insideInput: RowInput = [];
    //Just sum display values for books of the same name
    insideInput.push(book.title);
    insideInput.push(book.author);
    insideInput.push(book.isbn_10);
    insideInput.push(book.isbn_13);
    insideInput.push(book.displayCount);
    tableAllBooks.push(insideInput);
  });

  autoTable(doc, {
    head: [["Title", "Author", "ISBN 10", "ISBN 13", "Display Count"]],
    body: tableAllBooks,
    theme: "striped",
    headStyles: {
      fillColor: "#343a40",
    },
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Display Layout",
          styles: {
            halign: "left",
            fontSize: 14,
          },
        },
      ],
    ],
    theme: "plain",
  });
  //Implement each shelf's display
  shelves.forEach((shelf) => {
    autoTable(doc, {
      body: [
        [
          {
            content: "Shelf " + String(shelves.indexOf(shelf) + 1),
            styles: {
              halign: "left",
              fontSize: 20,
              textColor: "#ffffff",
            },
          },
        ],
      ],
      theme: "plain",
      styles: {
        fillColor: "#3366ff",
      },
    });
    autoTable(doc, {
      head: [["Title", "Author", "ISBN 10", "ISBN 13", "Display Count"]],
      body: tableAllBooks,
      theme: "striped",
      headStyles: {
        fillColor: "#343a40",
      },
    });
  });

  //const bookIdToQuantity = new Map<book, number>();
  //const bookIdToRevenue = new Map<book, number>();
  return doc.output("dataurlnewwindow");
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
