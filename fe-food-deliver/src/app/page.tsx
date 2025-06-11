"use client";

import Image from "next/image";
import { useAuth } from "./_component/UserProvider";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user?.userId) {
    router.push("/login");
  }

  return (
    <div>
      <div className="w-screen h-[668px] relative">
        <Image src="/banner.png" fill objectFit="cover" alt="bannerImage" />
      </div>
    </div>
  );
}
