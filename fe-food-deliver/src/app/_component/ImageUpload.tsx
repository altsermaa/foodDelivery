export const ImageUpload = (async: File) => {
  if (!File) {
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "fooddelivery");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dz8b3asdf/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    return result.secure.url;
  } catch (err:unknown) {
    return (err: "failed to upload image")
  }
};
