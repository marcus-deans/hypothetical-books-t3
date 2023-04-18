import type {
  GridColDef,
  GridPreProcessEditCellProps,
  GridRowModel,
} from "@mui/x-data-grid";
import Head from "next/head";
import Box from "@mui/material/Box";

import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
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
import { api } from "../../../utils/api";
import StripedDataGrid from "../../../components/table-components/StripedDataGrid";
import { z } from "zod";
import { useSession } from "next-auth/react";
import type { CustomUser } from "../../../schema/user.schema";
import { useRouter } from "next/router";
// const shelfSpace =
//     data.thickness === 0
//       ? (0.8 * data.inventoryCount).toFixed(2)
//       : (data.thickness * data.inventoryCount).toFixed(2);

// const shelfSpaceString =
// data.thickness === 0
//   ? `${shelfSpace.toString()}* in.`
//   : `${shelfSpace.toString()} in.`;

export default function AddShelf(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data: session, status } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const user = session?.user as CustomUser;
  const id = props.id;
  const router = useRouter();
  const editMutation = api.cases.edit.useMutation();

  const caseDetailsQuery = api.cases.getById.useQuery({ id: id });
  if (caseDetailsQuery.status !== "success") {
    return <div className="text-white">Loading...</div>;
  }
  const currentShelfCount = caseDetailsQuery?.data?.shelfCount ?? 0;
  const currentName = caseDetailsQuery?.data?.name ?? "Case Name";
  const currentWidth = caseDetailsQuery?.data?.width ?? 0;

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      headerClassName: "header-theme",
      flex: 1,
      align: "left",
      renderCell: (params) => {
        /* eslint-disable */
        const bookId = params.row.internalId as string;
        const bookTitle = params.row.title as string;
        /* eslint-enable */
        return (
          <div className="text-blue-600">
            <a href={`/books/${bookId}/detail`}>{bookTitle} </a>
          </div>
        );
      },
    },
    {
      field: "inventoryCount",
      headerName: "Inventory",
      headerClassName: "header-theme",
      flex: 1,
    },
    {
      field: "displayCount",
      headerName: "Display Count",
      headerClassName: "header-theme",
      flex: 1,
      editable: true,
      type: "number",
      align: "left",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError =
          isNaN(Number(params.props.value)) || Number(params.props.value) < 0;
        return { ...params.props, error: hasError };
      },
    },
    {
      field: "width",
      headerName: "Width",
      headerClassName: "header-theme",
      flex: 1,
    },
    {
      field: "height",
      headerName: "Height",
      headerClassName: "header-theme",
      flex: 1,
    },
    {
      field: "thickness",
      headerName: "Thickness",
      headerClassName: "header-theme",
      flex: 1,
    },
    {
      field: "displayStyle",
      headerName: "Display Style",
      headerClassName: "header-theme",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Spine Out", "Cover Out"],
    },
    {
      field: "position",
      headerName: "Position",
      headerClassName: "header-theme",
      flex: 1,
      editable: true,
      type: "number",
      align: "left",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError =
          isNaN(Number(params.props.value)) || Number(params.props.value) < 0;
        return { ...params.props, error: hasError };
      },
    },
    {
      field: "shelfSpace",
      headerName: "Shelf Space",
      headerClassName: "header-theme",
      flex: 1,
    },
  ];

  interface BookCalcDetails {
    id: string;
    internalId: string;
    title: string;
    inventoryCount: number;
    displayCount: number;
    width: number;
    height: number;
    thickness: number;
    displayStyle: string;
    shelfSpace: string;
    usedDefault: boolean;
    author: string;
    position: number;
  }

  const [bookValue, setBookValue] = useState<{
    label: string;
    id: string;
  } | null>(null);
  const [bookInputValue, setBookInputValue] = useState("");
  const [displayedBooks, setDisplayedBooks] = useState<BookCalcDetails[]>([]);
  const [totalSpaceSum, setTotalSpaceSum] = useState(0);

  const booksQuery = api.books.getAllWithAuthorsAndGenre.useQuery({
    cursor: null,
    limit: 100,
  });
  const books = booksQuery?.data?.items ?? [];
  const addMutation = api.shelves.add.useMutation();
  const bookOptions = books.map((book) => ({
    label: `${book.title} (${book.isbn_13})`,
    id: book.id,
  }));

  const rows = displayedBooks;

  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    const newDisplayedBooks = displayedBooks.map((displayedBook, index) => {
      const oldId = (oldRow as BookCalcDetails).id;
      if (displayedBook.id === oldId) {
        const newSpace = calcShelfSpace(
          Number(newRow.width),
          Number(newRow.height),
          Number(newRow.thickness),
          String(newRow.displayStyle),
          Number(newRow.displayCount)
        );
        const spaceVal = newSpace;
        newRow.shelfSpace = newRow.usedDefault ? `${spaceVal} *` : spaceVal;
        /* eslint-disable */
        let thickness = newRow.thickness as number;
        /* eslint-enable */
        if (thickness == 0) {
          thickness = 0.8;
        }
        //Case of old count now violating new cover out config
        if (
          newRow.displayStyle == "Cover Out" &&
          thickness * newRow.displayCount > 8
        ) {
          newRow.displayCount = Math.floor(8 / thickness);
        }
        if (newRow.position > displayedBooks.length) {
          return oldRow as BookCalcDetails;
        }
        displayedBooks.forEach((book) => {
          /* eslint-disable */
          const oldPosition = oldRow.position as number;
          const newPosition = newRow.position as number;
          /* eslint-enable */
          if (book.position == newPosition) {
            book.position = oldPosition;
          }
        });

        return newRow as BookCalcDetails;
        //Recalculate the shelf space
      } else {
        // The rest haven't changed
        return displayedBook;
      }
    });
    const newArray: BookCalcDetails[] = [];
    newDisplayedBooks.forEach(function (element) {
      newArray[element.position - 1] = element;
    });
    setDisplayedBooks(newArray);
    const newSpace =
      totalSpaceSum -
      parseSpace(String(oldRow.shelfSpace)) +
      parseSpace(String(newRow.shelfSpace));
    setTotalSpaceSum(newSpace);
    return newRow;
  };

  const parseSpace = (shelfSpaceStr: string): number => {
    return parseFloat(shelfSpaceStr);
  };
  const handleProcessRowUpdateError = (error: Error) => {
    toast.error(error.message);
  };

  const handleSave = () => {
    // caseId: z.string(),
    //   spaceUsed: z.number(),
    //   bookDetails: z
    //   .object({
    //     bookId: z.string(),
    //     orientation: z.string(),
    //   })
    //   .array(),
    //   user: z.object({
    //   id: z.string(),
    //   name: z.string(),
    //   role: z.string(),
    // }),
    try {
      addMutation.mutate({
        caseId: id,
        spaceUsed: totalSpaceSum,
        bookDetails: displayedBooks.map((book) => {
          console.log(book.displayStyle);

          return {
            bookId: book.internalId,
            orientation: book.displayStyle,
            displayCount: Number(book.displayCount),
            author: book.author,
          };
        }),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        user: user!,
      });
      const newCount = currentShelfCount + 1;
      const editResult = editMutation.mutate({
        caseId: id,
        name: currentName,
        width: currentWidth,
        shelfCount: newCount,
        shelvesIds: [],
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        user: user!,
      });
      setTimeout(() => {
        void router.push(`/designer/${id}/detail`);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    //Add book value to the rows
    //Clear the autocomplete bar to add the next book
    if (bookValue) {
      //use query to get the book we just searched
      const specificBook = books.find((item) => item.id === bookValue.id);
      if (specificBook) {
        const displayBook: BookCalcDetails = {
          id: uuidv4(),
          internalId: specificBook.id,
          title: specificBook.title,
          inventoryCount: specificBook.inventoryCount,
          displayCount: specificBook.inventoryCount,
          width: specificBook.width,
          height: specificBook.height,
          thickness: specificBook.thickness,
          displayStyle: "Spine Out",
          shelfSpace: "",
          usedDefault: false,
          author: specificBook.authors[0]?.name ?? "",
          position: 0,
        };
        displayBook.shelfSpace = calcShelfSpace(
          displayBook.width,
          displayBook.height,
          displayBook.thickness,
          displayBook.displayStyle,
          displayBook.displayCount
        ).toString();
        if (
          specificBook.width == 0 ||
          specificBook.height == 0 ||
          specificBook.thickness == 0
        ) {
          displayBook.usedDefault = true;
        }
        setDisplayedBooks((prev) => [...prev, displayBook]);
        displayBook.position = displayedBooks.length + 1;
        setTotalSpaceSum(totalSpaceSum + parseFloat(displayBook.shelfSpace));
        const spaceVal = Number.parseFloat(displayBook.shelfSpace)
          .toFixed(2)
          .toString();
        displayBook.shelfSpace = displayBook.usedDefault
          ? spaceVal + "*"
          : spaceVal;

        toast.success("Added " + specificBook.title);
      }
    }
    setBookInputValue("");
    setBookValue(null);
  };

  const calcShelfSpace = (
    width: number,
    height: number,
    thickness: number,
    displayStyle: string,
    displayCount: number
  ) => {
    if (displayStyle === "Spine Out") {
      if (thickness === 0) {
        thickness = 0.8;
      }
      return Number(thickness * displayCount).toFixed(2);
    }
    if (displayStyle === "Cover Out") {
      if (displayCount == 0) {
        return 0;
      }
      if (width == 0) {
        width = 6;
      }
      return Number(width).toFixed(2);
    } else {
      return Number(0).toString();
    }
  };

  return (
    <>
      <Head>
        <title>Shelf Designer</title>
      </Head>
      <div className="pt-6"></div>
      <div className="rounded-lg bg-white pt-3">
        <div className="mb-2 block text-lg font-bold text-gray-700">
          Shelf Designer (Positions Numbered from Left to Right)
        </div>
        <Autocomplete
          options={bookOptions}
          value={bookValue}
          onChange={(event, newValue: { label: string; id: string } | null) => {
            setBookValue(newValue);
          }}
          onInputChange={(event, newBookInputValue: string) => {
            setBookInputValue(newBookInputValue);
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ width: 425 }}
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
              }}
              label="Search books by title"
            />
          )}
        />
        <div className="pt-3" />
        <button
          className="space focus:shadow-outline flex rounded bg-blue-500 py-2 px-4 align-middle font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="button"
          id="button-addon2"
          onClick={handleSubmit}
        >
          Add Book
        </button>
        <div className="mt-3 h-3/4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
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
              editMode="row"
              columns={columns}
              autoHeight={true}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowHeight={() => "auto"}
              disableSelectionOnClick
              processRowUpdate={processRowUpdate}
              onProcessRowUpdateError={handleProcessRowUpdateError}
              experimentalFeatures={{ newEditingApi: true }}
              getRowClassName={(params) =>
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
              }
            />
          </Box>
          <div className="pt-1 text-lg">
            {`Total Shelf Space: ${totalSpaceSum.toFixed(2)} inches`}
          </div>
          <div className="pb-1 text-sm">
            {
              "*: Shelf space from estimated width of 0.8, height of 8, or width of 6 for zero-valued parameters"
            }
          </div>
        </div>
        <button
          className="space focus:shadow-outline flex rounded bg-blue-500 py-2 px-4 align-middle font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="button"
          id="button-addon2"
          onClick={handleSave}
        >
          Save Shelf
        </button>
      </div>

      <ToastContainer></ToastContainer>
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
