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
import React, { ChangeEvent, MouseEventHandler, useState } from "react";
import { FormControl, FormHelperText, FormLabel } from "@mui/joy";
import { TextField, Autocomplete, InputAdornment } from "@mui/material";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
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
  const { data } = bookDetailsQuery;

  const [retailPrice, setRetailPrice] = useState(
    data?.retailPrice.toString() ?? ""
  );
  const [pageCount, setPageCount] = useState(data?.pageCount.toString() ?? "");
  const [width, setWidth] = useState(data?.width.toString() ?? "");
  const [height, setHeight] = useState(data?.height.toString() ?? "");
  const [thickness, setThickness] = useState(data?.thickness.toString() ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [genreValue, setGenreValue] = useState<{
    label: string;
    id: string;
  } | null>({
    label: bookDetailsQuery?.data?.genre.name ?? "",
    id: bookDetailsQuery?.data?.genre.id ?? "",
  });
  const [genreInputValue, setGenreInputValue] = useState("");

  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      if (!genreValue) {
        throw new Error("Genre is required");
      }
      const finalRetailPrice = Number(retailPrice);
      const finalPageCount = Number(pageCount);
      const finalWidth = Number(width);
      const finalHeight = Number(height);
      const finalThickness = Number(thickness);

      if (isNaN(finalRetailPrice)) {
        throw new Error("Retail price is required");
      }
      if (isNaN(finalPageCount)) {
        throw new Error("Page count is required");
      }
      if (isNaN(finalWidth) || isNaN(finalHeight) || isNaN(finalThickness)) {
        throw new Error("Dimensions are required");
      }
      const addResult = editMutation.mutate({
        id: id,
        retailPrice: finalRetailPrice,
        pageCount: finalPageCount,
        genreId: genreValue.id,
        width: finalWidth,
        height: finalHeight,
        thickness: finalThickness,
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

  const [file, setFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (event: React.MouseEvent<HTMLElement>) =>{
    event.preventDefault()
    if(!file){
      toast.error("No file Selected. Please Select a File")
      return;
    }
    if(file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/jpg"){
      toast.error("Input file is not an image. Please select a JPG, JPEG, or PNG.");
      return;
    }
    //Implement API call to send image back
    
  }

  return (
    <>
    <div>
    </div>
    <div className="flex w-full items-center ">
      <form className="mb-4 w-3/4 items-center rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <div className="mb-4 items-center space-y-5">
          <div className="mb-2 block text-lg font-bold text-gray-700">
            Edit Book
          </div>
          <div className="relative space-y-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <div className="col-span-4">
              <div className="space-y-10">
                <div className="flex w-4/5 space-x-10">
                  <div className="text-gra-700 text-md font-bold">
                    {`${bookDetailsQuery?.data?.title ?? ""} by ${
                      bookDetailsQuery?.data?.authors
                        .map((author) => author.name)
                        .join(", ") ?? ""
                    }`}
                  </div>
                  <div className="text-gra-700 text-md font-bold">
                    {`ISBN-13: ${bookDetailsQuery?.data?.isbn_13 ?? ""}`}
                  </div>
                </div>
                <div className="flex w-4/5 space-x-10">
                  <TextField
                    id="retailPrice"
                    label="Retail Price"
                    value={retailPrice}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => setRetailPrice(event.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    required
                  />
                  <TextField
                    id="pageCount"
                    label="Page Count"
                    value={pageCount}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => setPageCount(event.target.value)}
                    required
                  />
                </div>
                <div className="flex w-4/5 space-x-10">
                  <TextField
                    id="thickness"
                    label="Thickness"
                    value={thickness}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => setThickness(event.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">inches</InputAdornment>
                      ),
                    }}
                    required
                  />
                  <TextField
                    id="width"
                    label="Width"
                    value={width}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => setWidth(event.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">inches</InputAdornment>
                      ),
                    }}
                    required
                  />
                  <TextField
                    id="height"
                    label="Height"
                    value={height}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void => setHeight(event.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">inches</InputAdornment>
                      ),
                    }}
                    required
                  />
                </div>
                <div className="flex w-4/5 space-x-10">
                  <FormControl>
                    <FormLabel>Genre Name</FormLabel>
                    <FormHelperText>Select a genre by name</FormHelperText>
                    <Autocomplete
                      options={genreOptions}
                      placeholder={"Select a genre by name"}
                      value={genreValue}
                      onChange={(
                        event: any,
                        newValue: { label: string; id: string } | null
                      ) => {
                        setGenreValue(newValue);
                      }}
                      onInputChange={(event: any, newInputValue: string) => {
                        setGenreInputValue(newInputValue);
                      }}
                      sx={{ width: 425 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          inputProps={{
                            ...params.inputProps,
                          }}
                        />
                      )}
                    />
                  </FormControl>
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
              <div>
      <input type="file" onChange={handleFileChange} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"/>

      <div>{file && `${file.name}`}</div>

      <button onClick = {handleUpload} className="padding-top:10px bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload</button>
                              <ToastContainer></ToastContainer>

    </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    </>
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
