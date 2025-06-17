"use client";

import Image from "next/image";
import { useAuth } from "./_component/UserProvider";
import { useRouter } from "next/navigation";
import { PartAppetizer } from "./_component/PartAppetizer";
import { ImageUpload } from "./_component/ImageUpload";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user?.userId) {
    router.push("/login");
  }

  return (
    <div>
      <div className="w-screen h-[570px] relative">
        <Image src="/banner.png" fill objectFit="fill" alt="bannerImage" />
      </div>
      <div className="w-full p-22">
        <PartAppetizer />
      </div>
      <ImageUpload />
    </div>
  );
}
