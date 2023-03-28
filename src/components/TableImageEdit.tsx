import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { ImageCard } from "../pages/books/[id]/edit";

export default function TableImageEdit(
  id: number,
  imgUrl: string,
  setImgUrl: (imgUrl: string, index: number) => void
) {
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const defaultUrl =
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png";

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
          setImgUrl(data.url, id);
          /* eslint-enable */
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
    setImgUrl(defaultUrl, id);
    toast.success("Image Removed");
  };

  return (
    <div className="inline-block flex justify-center space-x-5 pt-6">
      <input
        type="file"
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
        onClick={handleRemoveImage}
        className="padding-top:10px rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      >
        Delete Image
      </button>
      <div className="flex justify-center">
        <ImageCard
          deleteImage={handleRemoveImage}
          url={imgUrl ?? defaultUrl}
          id={id}
          key={id}
        />
      </div>
    </div>
  );
}
