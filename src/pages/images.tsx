import React, { useRef, useState } from "react";
// import { trpc } from "@trpc/react-query";
import { api } from "../utils/api";
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
    <div className="mt-10 flex w-full flex-1 justify-center">
      <div className="w-full transform rounded-xl bg-white p-6 shadow-xl transition-all duration-500 hover:shadow-2xl">
        <Image
          className="h-32 w-full object-cover"
          src={url}
          alt="user image"
        />
        <div className="mt-2 flex justify-end">
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

export default function ImagesPage() {
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: createPresignedUrl } =
    api.imageUpload.createPresignedUrl.useMutation();
  // trpc.useMutation('image.createPresignedUrl');

  const { data: images, refetch: refetchImages } =
    api.imageUpload.getImagesForUser.useQuery();
  // trpc.useQuery(['image.getImagesForUser'])

  const onFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newFile = e.currentTarget?.files?.[0];
    if (newFile) {
      setFile(newFile);
    }
  };

  const refetchUserImages = async () => {
    await refetchImages();
  };

  const uploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    const presignedUrl = (await createPresignedUrl()) as S3.PresignedPost;
    const url = presignedUrl.url;
    const fields = presignedUrl.fields;
    // const { url, fields }: { url: string; fields: { [p: string]: unknown } } =
    //   (await createPresignedUrl()) as never;
    const data = {
      ...fields,
      "Content-Type": file.type,
      file,
    };
    const formData = new FormData();
    formData.append("Content-Type", data["Content-Type"]);
    formData.append("File", data?.file);
    formData.append("Policy", data.Policy);
    formData.append("X-Amz-Signature", data["X-Amz-Signature"]);
    // for (const name in data) {
    //   formData.append(name, data[name]);
    // }
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
    <div>
      <div className="container mx-auto h-full pt-12 pb-64 text-center">
        <h1 className="mb-4 text-4xl">Manage Images</h1>

        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form className="text-white" onSubmit={uploadImage}>
          Upload Image
          <input
            ref={fileRef}
            className="ml-4 text-white"
            onChange={onFileChange}
            type="file"
          ></input>
          {file && <button type="submit">Upload</button>}
        </form>

        <div className="grid grid-cols-5 gap-8">
          {images &&
            images.map((image) => (
              <ImageCard
                refetchImages={refetchUserImages}
                key={image.id}
                {...image}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
