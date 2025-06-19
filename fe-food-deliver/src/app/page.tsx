import Image from "next/image";
import { PartAppetizer } from "./_component/PartAppetizer";
import { ImageUpload } from "./_component/ImageUpload";
import axios from "axios";

export default async function Home() {
  const { data } = await axios.get("http://localhost:8000/readyFoods");

  return (
    <div className="bg-[#404040]">
      <div className="w-screen h-[570px] relative">
        <Image src="/banner.png" fill objectFit="fill" alt="bannerImage" />
      </div>
      <div className="w-full p-22">
        <PartAppetizer foods={data.foods} />
      </div>
      <ImageUpload />
    </div>
  );
}
