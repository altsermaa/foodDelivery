"use client";

import { useAuth } from "./_component/UserProvider";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuth();
  console.log(user);
  const router = useRouter();

  // if (!user?.userId) {
  //   router.push("/login");
  // }

  return <div> {user?.userId} HOME PAGE HEHE</div>;
}
