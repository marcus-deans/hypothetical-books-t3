export const mediaUploader = async (file: File, public_id: string) => {
  const media = [];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "books");
  formData.append("cloud_name", "dtyhei91n");
  formData.append("public_id", public_id);
  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dtyhei91n/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await res.json();
    media.push(data);
  } catch (err) {
    console.error(err);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return media;
};
