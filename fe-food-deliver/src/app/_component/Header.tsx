"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart, UserRound } from "lucide-react";
import Image from "next/image";
import { InputSearch } from "./InputSearch";
import { Email } from "./Email";
import { useAuth } from "./UserProvider";

export const Header = () => {
  const { user } = useAuth();

  return (
    <div>
      {user.userId && (
        <div className="w-screen h-[68px] py-3 px-24 bg-[#18181B] flex justify-between relative">
          <div className="flex gap-3">
            <Image src="/logoHat.png" width={46} height={37} alt="logo" />
            <div className="flex flex-col">
              <div className="flex">
                <p className="text-white font-semibold text-xl">Nom</p>
                <p className="text-[#EF4444] font-semibold text-xl">Nom</p>
              </div>
              <p className="text-white text-xs">Swift delivery</p>
            </div>
          </div>
          <div className="flex gap-3">
            <InputSearch />
            <Button className="rounded-2xl" variant="outline" size="icon">
              <ShoppingCart />
            </Button>
            <Button className="rounded-2xl" variant="destructive" size="icon">
              <UserRound />
            </Button>
          </div>
          <div className="absolute top-15 right-25 z-50">
            <Email />
          </div>
        </div>
      )}
    </div>
  );
};
