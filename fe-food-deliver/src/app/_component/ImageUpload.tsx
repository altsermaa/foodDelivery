"use client";

import Image from "next/image";
import { useState } from "react";

export const ImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  console.log(file);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  console.log(imageUrl);

  const upload = async () => {
    if (!file) {
      alert("Please select a file");
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
      alert("success");
      console.log(result.secure_url);
      setImageUrl(result.secure_url);
    } catch (err: unknown) {
      console.log(err);
      alert("failed to upload image");
      return null;
    }
  };

  const fileHandler = (event: any) => {
    setFile(event?.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={fileHandler} />
      <button onClick={upload}>Upload</button>
      {imageUrl && (
        <Image src={imageUrl} alt="image" width={400} height={400} />
      )}
    </div>
  );
};
