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
import Head from "next/head";
import React, { useRef, useState } from "react";
import { FormControl, FormHelperText, FormLabel } from "@mui/joy";
import { Autocomplete, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import type { S3 } from "aws-sdk/clients/browser_default";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import type { CustomUser } from "../../../schema/user.schema";
import { useSession } from "next-auth/react";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { throwError } from "rxjs";

const ImageCard = ({
  url,
  id,
  deleteImage,
}: {
  url: string;
  id: string;
  deleteImage: (event: React.MouseEvent<HTMLElement>) => void;
}) => {
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
          <button onClick={deleteImage}>Remove</button>
        </div>
      </div>
    </div>
  );
};

/* eslint-disable */
// @ts-ignore
const modalStyle = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "6px",
  p: 3,
};
/*eslint-enable */

export default function EditBook(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data: session, status } = useSession();
  const user = session?.user as CustomUser;
  const { id } = props;
  const router = useRouter();
  const bookDetailsQuery = api.books.getByIdWithAllDetailsAndSubsidiary.useQuery({ id });
  const genreDetailsQuery = api.genres.getAll.useQuery({
    cursor: null,
    limit: 100,
  });
  const genres = genreDetailsQuery?.data?.items ?? [];
  const editMutation = api.books.edit.useMutation();
  const addInventoryCorrectionMutation = api.corrections.add.useMutation();
  const { data } = bookDetailsQuery;

  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const defaultUrl =
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png";
  const [retailPrice, setRetailPrice] = useState(
    data?.internalBook.retailPrice.toString() ?? ""
  );
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [imageDeleted, setImageDeleted] = useState(false);
  const [imgUrl, setImgUrl] = useState(
    imageDeleted ? defaultUrl : data?.internalBook.imgUrl ?? ""
  );
  const [subData, setSubData] = useState(data?.remoteBook !== null);
  const [pageCount, setPageCount] = useState(data?.internalBook.pageCount.toString() ?? "");
  const [width, setWidth] = useState(data?.internalBook.width.toString() ?? "");
  const [height, setHeight] = useState(data?.internalBook.height.toString() ?? "");
  const [thickness, setThickness] = useState(data?.internalBook.thickness.toString() ?? "");
  const [inventory, setInventory] = useState(
    data?.internalBook.inventoryCount.toString() ?? ""
  );
  const [tempInventory, setTempInventory] = useState("0");
  const [finalInventoryCorrection, setFinalInventoryCorrection] = useState("0");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingInvCorrection, setIsSubmittingInvCorrection] =
    useState(false);
  const [genreValue, setGenreValue] = useState<{
    label: string;
    id: string;
  } | null>({
    label: bookDetailsQuery?.data?.internalBook.genre.name ?? "",
    id: bookDetailsQuery?.data?.internalBook.genre.id ?? "",
  });
  const [genreInputValue, setGenreInputValue] = useState("");
  const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs(new Date()));
  const [inventoryCorrection, setInventoryCorrection] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    try {
      if (!genreValue) {
        toast.error("Genre is required");
        throw new Error("Genre is required");
      }
      const finalRetailPrice = Number(retailPrice);
      const finalPageCount = Number(pageCount);
      const finalWidth = Number(width);
      const finalHeight = Number(height);
      const finalThickness = Number(thickness);

      if (isNaN(finalRetailPrice)) {
        toast.error("Retail price is required");
        throw new Error("Retail price is required");
      }
      if (isNaN(finalPageCount)) {
        toast.error("Page count is required");
        throw new Error("Page count is required");
      }
      if (isNaN(finalWidth) || isNaN(finalHeight) || isNaN(finalThickness)) {
        toast.error("Dimensions are required");
        throw new Error("Dimensions are required");
      }

      const editResult = editMutation.mutate({
        id: id,
        retailPrice: finalRetailPrice,
        pageCount: finalPageCount,
        genreId: genreValue.id,
        width: finalWidth,
        height: finalHeight,
        thickness: finalThickness,
        imgUrl: imgUrl,
      });

      if (inventoryCorrection && finalInventoryCorrection !== "0") {
        addInventoryCorrectionMutation.mutate({
          bookId: id,
          quantity: parseInt(tempInventory),
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          user: user!,
        });
      }
    } catch (error) {
      toast.error(`Error submitting form.`);
      console.log(error);
      setIsSubmitting(false);
      return;
    }
    setTimeout(() => {
      void router.push(`/books/${encodeURIComponent(id)}/detail`);
    }, 1500);
  };

  const genreOptions = genres.map((genre) => ({
    label: genre.name,
    id: genre.id,
  }));

  const { mutateAsync: createPresignedUrl } =
    api.imageUpload.createPresignedUrl.useMutation();
  // trpc.useMutation('image.createPresignedUrl');

  // const { mutateAsync: getImageUrl } =
  //   api.imageUpload.getImageUrl.useMutation();

  // const { data: image, refetch: refetchImages } =
  //   api.imageUpload.getImageFromId.useQuery({ bookId: id });
  // trpc.useQuery(['image.getImagesForUser'])
  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setFile(null);
    setFileInputKey(Date.now());
    toast.success("Deleted Image");
  };

  const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newFile = e.currentTarget?.files?.[0];
    if (newFile) {
      setFile(newFile);
    }
  };

  const asyncUpload = async () => {
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
    // const presignedUrl = (await createPresignedUrl({
    //   bookId: id,
    // })) as S3.PresignedPost;
    // const url = presignedUrl.url;
    // const fields = presignedUrl.fields;
    const imageData = {
      // ...fields,
      "Content-Type": file.type,
      file,
    };
    const formData = new FormData();
    for (const name in imageData) {
      /* eslint-disable */
      // @ts-ignore
      formData.append(name, imageData[name]);
    }
    formData.append("upload_preset", "ilppmkg4");
    formData.append("folder", id);
    // formData.append("public_id", id);
    /*eslint-enable */

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dtyhei91n/image/upload/`;
    // console.log(`URL: ${url}`);
    await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          throw new Error("Error uploading image");
        }
        /* eslint-disable */
        console.log(data);
        if (data.url && data.url !== "") {
          console.log(data.url);
          setImgUrl(data.url);
          /* eslint-enable */
        }
      })
      .catch((error) => {
        console.error(error);
      });
    // const imageUrl = await getImageUrl({ bookId: id });
    // setImgUrl(imageUrl);
    setFile(null);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
    toast.success("Added Image");
  };

  const handleUpload = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    void asyncUpload();
    //Implement API call to send image back
  };
  const handleRemoveImage = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    // await refetchImages();
    setImageDeleted(true);
    setImgUrl("");
    console.log("In between resets");
    setImgUrl(defaultUrl);
    console.info(imgUrl);
    toast.success("Image Removed");
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setInventoryCorrection(false);
  };
  const handleClose = () => {
    setOpen(false);
    setInventoryCorrection(false);
  };
  const [openDialog, setDialogOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogAccept = () => {
    setIsSubmittingInvCorrection(false);
    setDialogOpen(false);
    handleClose();
    setInventoryCorrection(true);
    setFinalInventoryCorrection(tempInventory);
    toast.success("Inventory correction ready for final submission");
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setInventoryCorrection(false);
    setIsSubmittingInvCorrection(false);
  };

  const handleInventoryCorrection = () => {
    setIsSubmittingInvCorrection(true);
    try {
      const finalInventory = Number(tempInventory);
      if (user?.role !== "admin") {
        toast.error("Only admins can change inventory");
        throw new Error("User is not an admin");
      }
      if (isNaN(finalInventory)) {
        toast.error("Inventory change must be a valid number");
        throw new Error("Inventory is not a number");
      }
      if (!Number.isInteger(finalInventory)) {
        toast.error("Inventory must be an integer");
        throw new Error("Inventory is not an integer");
      }
      if (parseInt(inventory) + finalInventory < 0) {
        toast.error("Final Inventory must be a positive number");
        throw new Error("Inventory is not positive");
      }
      if (finalInventory !== 0 && parseInt(inventory) + finalInventory >= 0) {
        setDialogOpen(true);
      } else {
        setOpen(false);
        setIsSubmittingInvCorrection(false);
        setInventoryCorrection(false);
        toast.warn("No Changes Made");
      }
    } catch (error) {
      setIsSubmittingInvCorrection(false);
      setInventoryCorrection(false);
      return;
    }
  };

  return (
    <>
      <Head>
        <title>Edit Book</title>
      </Head>
      <div className="pt-6">
        <form className="inline-block rounded bg-white px-6 pt-3">
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
                      {`${bookDetailsQuery?.data?.internalBook.title ?? ""} by ${bookDetailsQuery?.data?.internalBook.authors
                        .map((author) => author.name)
                        .join(", ") ?? ""
                        }`}
                    </div>
                    <div className="text-gra-700 text-md font-bold">
                      {`ISBN-13: ${bookDetailsQuery?.data?.internalBook.isbn_13 ?? ""}`}
                    </div>
                  </div>
                  <div className="flex justify-center space-x-10">
                    <div>
                      <TextField
                        id="retailPrice"
                        label="Retail Price"
                        value={retailPrice}
                        defaultValue={data?.internalBook?.retailPrice ?? 0}
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
                      {subData ? <div>
                        <div className="flex justify-center items-center mr-2 pt-1">
                          <IconButton className="bg-blue-500 hover:bg-blue-700" size="small" onClick={() => {
                            setRetailPrice((data?.remoteBook?.retailPrice ?? 0).toString());
                          }}>
                            <SwapVertIcon style={{ color: "white" }} />
                          </IconButton>
                          <label htmlFor="retailPrice-checkbox" className="ml-2 text-sm font-normal text-gray-900">${data?.remoteBook?.retailPrice}</label>
                        </div>
                      </div> : null}
                    </div>
                    <div>
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
                      {subData ? <div>
                        <div className="flex justify-center items-center mr-2 pt-1">
                          <IconButton className="bg-blue-500 hover:bg-blue-700" size="small" onClick={() => {
                            setPageCount((data?.remoteBook?.pageCount ?? 0).toString());
                          }}>
                            <SwapVertIcon style={{ color: "white" }} />
                          </IconButton>
                          <label className="ml-2 text-sm font-normal text-gray-900">{data?.remoteBook?.pageCount}</label>
                        </div>
                      </div> : null}
                    </div>
                    {user?.role == "admin" ? (
                      <button
                        className="padding-top:10px rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 h-14"
                        type="button"
                        onClick={handleOpen}
                      >
                        Inventory Correction
                      </button>
                    ) : null}
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={modalStyle}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Inventory Correction
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          <TextField
                            id="currentInv"
                            label="Current Inventory"
                            value={inventory}
                            variant={"outlined"}
                            sx={{
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "black",
                              },
                              width: 125,
                            }}
                            disabled
                          />
                          <TextField
                            id="deltainv"
                            label="Change / Delta"
                            value={tempInventory}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ): void => setTempInventory(event.target.value)}
                            variant={"outlined"}
                            type="number"
                            sx={{
                              width: 125,
                            }}
                            required
                          />
                          <TextField
                            id="newinv"
                            label="New Inventory"
                            value={
                              isNaN(
                                parseInt(inventory) + parseInt(tempInventory)
                              )
                                ? "--"
                                : parseInt(inventory) + parseInt(tempInventory)
                            }
                            variant={"outlined"}
                            type="number"
                            sx={{
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: isNaN(
                                  parseInt(tempInventory)
                                )
                                  ? "black"
                                  : parseInt(tempInventory) +
                                    parseInt(inventory) >=
                                    0
                                    ? "green"
                                    : "red",
                              },

                              width: 125,
                            }}
                            disabled
                          />
                        </Typography>
                        {subData ? <div>
                          <div className="flex items-center py-3">
                            <IconButton className="bg-blue-500 hover:bg-blue-700" size="small" onClick={() => {
                              setTempInventory((parseInt(inventory) - (data?.remoteBook?.inventoryCount ?? 0)).toString());
                            }}>
                              <SwapVertIcon style={{ color: "white" }} />
                            </IconButton>
                            <label htmlFor="inventory-checkbox" className="ml-2 text-sm font-normal text-gray-900">Subsidiary Inventory: {data?.remoteBook?.inventoryCount}</label>
                          </div>
                        </div> : <div className="pt-6" />}
                        <button
                          className="space focus:shadow-outline flex rounded bg-blue-500 py-2 px-4 align-middle font-bold text-white hover:bg-blue-700 focus:outline-none"
                          type="button"
                          onClick={handleInventoryCorrection}
                        >
                          {isSubmittingInvCorrection
                            ? "Submitting..."
                            : "Submit"}
                        </button>
                        <Dialog
                          open={openDialog}
                          onClose={handleDialogClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Inventory Correction Change!"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Are you sure you want to manaully change the
                              inventory for this book?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <button
                              className="space focus:shadow-outline flex rounded bg-blue-500 py-2 px-4 align-middle font-bold text-white hover:bg-blue-700 focus:outline-none"
                              type="button"
                              onClick={handleDialogClose}
                            >
                              No
                            </button>
                            <button
                              autoFocus
                              className="space focus:shadow-outline flex rounded bg-blue-500 py-2 px-4 align-middle font-bold text-white hover:bg-blue-700 focus:outline-none"
                              type="button"
                              onClick={handleDialogAccept}
                            >
                              Yes
                            </button>
                          </DialogActions>
                        </Dialog>
                      </Box>
                    </Modal>
                  </div>
                  <div className="flex justify-center space-x-10">
                    <div>
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
                      {subData ? <div>
                        <div className="flex justify-center items-center mr-2 pt-1">
                          <IconButton className="bg-blue-500 hover:bg-blue-700" size="small" onClick={() => {
                            setThickness((data?.remoteBook?.thickness ?? 0).toString());
                          }}>
                            <SwapVertIcon style={{ color: "white" }} />
                          </IconButton>
                          <label className="ml-2 text-sm font-normal text-gray-900">{data?.remoteBook?.thickness} inches</label>
                        </div>
                      </div> : null}
                    </div>
                    <div>
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
                      {subData ? <div>
                        <div className="flex justify-center items-center mr-2 pt-1">
                          <IconButton className="bg-blue-500 hover:bg-blue-700" size="small" onClick={() => {
                            setWidth((data?.remoteBook?.width ?? 0).toString());
                          }}>
                            <SwapVertIcon style={{ color: "white" }} />
                          </IconButton>
                          <label className="ml-2 text-sm font-normal text-gray-900">{data?.remoteBook?.width} inches</label>
                        </div>
                      </div> : null}
                    </div>
                    <div>
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
                      {subData ? <div>
                        <div className="flex justify-center items-center mr-2 pt-1">
                          <IconButton className="bg-blue-500 hover:bg-blue-700" size="small" onClick={() => {
                            setHeight((data?.remoteBook?.height ?? 0).toString());
                          }}>
                            <SwapVertIcon style={{ color: "white" }} />
                          </IconButton>
                          <label className="ml-2 text-sm font-normal text-gray-900">{data?.remoteBook?.height} inches</label>
                        </div>
                      </div> : null}
                    </div>
                  </div>
                  <div className="flex justify-center space-x-10">
                    <FormControl>
                      <Autocomplete
                        options={genreOptions}
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
                        isOptionEqualToValue={(option, value) => {
                          return option.id === value.id;
                        }}
                        sx={{ width: 400 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                            }}
                            label="Select a Genre by Name"
                          />
                        )}
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="inline-block flex justify-center space-x-5 pt-6">
                  <input
                    type="file"
                    key={fileInputKey}
                    onChange={handleFileChange}
                    className="rounded bg-blue-500 py-2 px-4 font-bold text-white"
                  />
                  {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                  <button
                    onClick={handleUpload}
                    className="padding-top:10px rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                  >
                    Upload
                  </button>
                  <button
                    onClick={handleDelete}
                    className="padding-top:10px rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                  >
                    Delete Image
                  </button>
                </div>
                <div className="flex justify-center">
                  <ImageCard
                    deleteImage={handleRemoveImage}
                    url={imgUrl ?? defaultUrl}
                    id={id}
                    key={id}
                  />
                </div>
                <div className="flex items-center justify-between pt-4">
                  <button
                    className="space focus:shadow-outline flex rounded bg-blue-500 py-2 px-4 align-middle font-bold text-white hover:bg-blue-700 focus:outline-none"
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
        <ToastContainer></ToastContainer>
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

  await ssg.books.getByIdWithAllDetailsAndSubsidiary.prefetch({ id });
  await ssg.genres.getAll.prefetch({ cursor: null, limit: 100 });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}
