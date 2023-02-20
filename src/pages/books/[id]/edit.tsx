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
import { useRouter } from "next/router";
import { api } from "../../../utils/api";
import React, { useState } from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { FormControl, FormHelperText, FormLabel } from "@mui/joy";
import { Autocomplete } from "@mui/material";

export default function EditBook(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { id } = props;
  const router = useRouter();
  const bookDetailsQuery = api.books.getByIdWithAllDetails.useQuery({
    id: id,
  });
  const genreDetailsQuery = api.genres.getAll.useQuery({
    cursor: null,
    limit: 100,
  });
  const genres = genreDetailsQuery?.data?.items ?? [];
  ``;
  const editMutation = api.books.edit.useMutation();
  const [retailPrice, setRetailPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [genreValue, setGenreValue] = useState<{
    label: string;
    id: string;
  } | null>({
    label: bookDetailsQuery?.data?.genre.name ?? "",
    id: bookDetailsQuery?.data?.genre.id ?? "",
  });
  const [genreInputValue, setGenreInputValue] = useState("");

  const inputPriceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = event.target.value;
    setRetailPrice(enteredName);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      if (!genreValue) {
        throw new Error("Genre is required");
      }
      if (!retailPrice && !isNaN(Number(retailPrice))) {
        throw new Error("Retail price is required");
      }
      const addResult = editMutation.mutate({
        id: id,
        retailPrice: Number(retailPrice),
        genreId: genreValue.id,
        purchaseLineIds: [],
        salesLineIds: [],
      });
      setTimeout(() => {
        void router.push(`/books/${encodeURIComponent(id)}/detail`);
      }, 500);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const genreOptions = genres.map((genre) => ({
    label: genre.name,
    id: genre.id,
  }));

  return (
    <div className="flex w-full items-center ">
      <form className="mb-4 w-3/4 items-center rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <div className="mb-4 items-center space-y-5">
          <div className="mb-2 block text-lg font-bold text-gray-700">
            Edit Book
          </div>
          <div className="relative space-y-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <div className="col-span-4 flex space-x-20">
              <FormControl>
                <FormLabel>Genre Name</FormLabel>
                <FormHelperText>Select a genre by name</FormHelperText>
                <Autocomplete
                  options={genreOptions}
                  placeholder={"Select a genre by name"}
                  value={genreValue}
                  onChange={(
                    event: any,
                    newValue: { label: string; id: string; } | null
                  ) => {
                    setGenreValue(newValue);
                  } }
                  onInputChange={(event: any, newInputValue: string) => {
                    setGenreInputValue(newInputValue);
                  } }
                  sx={{ width: 425 }} 
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputProps={{
                        ...params.inputProps
                      }}
                    />
                  )}                   
                  />              
              </FormControl>
            </div>
            <div>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                id="author"
                type="text"
                value={retailPrice}
                onChange={inputPriceHandler}
              />
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
        </div>
      </form>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const books = await prisma.book.findMany({
    select: {
      id: true,
    },
  });

  const paths = books.map((book) => ({
    params: { id: book.id },
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
    //eslint-disable-next-line
    transformer: superjson,
  });
  const id = context.params?.id as string;

  await ssg.books.getByIdWithAllDetails.prefetch({ id });
  await ssg.genres.getAll.prefetch({ cursor: null, limit: 100 });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
