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
import type { ChangeEvent } from "react";
import React, { MouseEventHandler, useRef, useState } from "react";
import { FormControl, FormHelperText, FormLabel } from "@mui/joy";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import type { S3 } from "aws-sdk/clients/browser_default";
import Image from "next/image";

const ImageCard = ({
  url,
  id,
  refetchImages,
}: {
  url: string;
  id: string;
  refetchImages: () => Promise<void>;
}) => {
  const { mutateAsync: deleteImage } = api.imageUpload.delete.useMutation();
  // trpc.useMutation('image.delete');

  return (
    <div className="mt-6 flex flex-1 justify-center">
      <div className="transform rounded-xl bg-white p-3 shadow-xl transition-all duration-500 hover:shadow-2xl">
        <Image
          className="object-cover"
          src={url}
          alt="Book Cover"
          width={100}
          height={100}
        />
        <div className="mt-2 flex justify-start">
          <button
            // eslint-disable-next-line
            onClick={async () => {
              await deleteImage({ imageId: id });
              await refetchImages();
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

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

  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: createPresignedUrl } =
    api.imageUpload.createPresignedUrl.useMutation();
  // trpc.useMutation('image.createPresignedUrl');

  const { data: images, refetch: refetchImages } =
    api.imageUpload.getImagesForUser.useQuery();
  // trpc.useQuery(['image.getImagesForUser'])

  const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newFile = e.currentTarget?.files?.[0];
    if (newFile) {
      setFile(newFile);
    }
  };

  const refetchUserImages = async () => {
    await refetchImages();
  };

  const handleUpload = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!file) {
      toast.error("No file Selected. Please Select a File");
      return;
    }
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/jpg"
    ) {
      toast.error(
        "Input file is not an image. Please select a JPG, JPEG, or PNG."
      );
      return;
    }
    const presignedUrl = (await createPresignedUrl()) as S3.PresignedPost;
    const url = presignedUrl.url;
    const fields = presignedUrl.fields;
    const imageData = {
      ...fields,
      "Content-Type": file.type,
      file,
    };
    const formData = new FormData();
    for (const name in imageData) {
      // @ts-ignore
      formData.append(name, imageData[name]);
    }
    await fetch(url, {
      method: "POST",
      body: formData,
    });
    await refetchImages();
    setFile(null);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  return (
    <>
      <div className="pt-6">
        <form className="rounded bg-white px-6 pt-3 inline-block">
          <div className="mb-4 items-center">
            <div className="mb-2 block text-lg font-bold text-gray-700">
              Edit Book
            </div>
            <div className="relative space-y-3">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <div className="col-span-4">
                <div className="space-y-10">
                  <div className="flex justify-center space-x-10">
                    <div className="text-gra-700 text-md font-bold">
                      {`${bookDetailsQuery?.data?.title ?? ""} by ${bookDetailsQuery?.data?.authors
                        .map((author) => author.name)
                        .join(", ") ?? ""
                        }`}
                    </div>
                    <div className="text-gra-700 text-md font-bold">
                      {`ISBN-13: ${bookDetailsQuery?.data?.isbn_13 ?? ""}`}
                    </div>
                  </div>
                  <div className="flex justify-center space-x-10">
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
                      sx={{
                        width: 120,
                      }}
                    />
                    <TextField
                      id="pageCount"
                      label="Page Count"
                      value={pageCount}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ): void => setPageCount(event.target.value)}
                      required
                      sx={{
                        width: 120,
                      }}
                    />
                  </div>
                  <div className="flex justify-center space-x-10">
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
                      sx={{
                        width: 150,
                      }}
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
                      sx={{
                        width: 150,
                      }}
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
                      sx={{
                        width: 150,
                      }}
                    />
                  </div>
                  <div className="flex justify-center space-x-10">
                    <FormControl>
                      <FormLabel>Genre Name</FormLabel>
                      <FormHelperText>Select a genre by name</FormHelperText>
                      <Autocomplete
                        options={genreOptions}
                        placeholder={"Select a genre by name"}
                        value={genreValue}
                        onChange={(
                          event,
                          newValue: { label: string; id: string } | null
                        ) => {
                          setGenreValue(newValue);
                        }}
                        onInputChange={(event, newInputValue: string) => {
                          setGenreInputValue(newInputValue);
                        }}
                        sx={{ width: 400 }}
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
                <div className="flex space-x-5 justify-center inline-block pt-6">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="rounded bg-blue-500 py-2 px-4 font-bold text-white"
                  />

                  <div>{file && `${file.name}`}</div>

                  <button
                    onClick={handleUpload}
                    className="padding-top:10px rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                  >
                    Upload
                  </button>
                  <ToastContainer></ToastContainer>
                </div>
                <div className="flex justify-center">
                  {images &&
                    images.map((image) => (
                      <ImageCard
                        refetchImages={refetchUserImages}
                        key={image.id}
                        {...image}
                      />
                    ))}
                </div>
                <div className="flex items-center justify-between pt-4">
                  <button
                    className="flex space focus:shadow-outline rounded bg-blue-500 py-2 px-4 align-middle font-bold text-white hover:bg-blue-700 focus:outline-none"
                    type="button"
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
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
