"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart, UserRound } from "lucide-react";
import Image from "next/image";
import { InputSearch } from "./InputSearch";
import { Email } from "./Email";
import { useAuth } from "./UserProvider";

export const Footer = () => {
  const { user } = useAuth();

  return (
    <div>
      {user.userId && (
        <div className="w-screen h-fit bg-[#18181B] pt-16">
          <div className="w-full h-[29px] bg-[#EF4444] text-white py-6 font-black">
            Fresh fast delivered
          </div>
          <div className="mx-auto mt-20 mb-24 flex">
            <div className="flex flex-col gap-3 mr-56">
              <Image src="/logoHat.png" width={46} height={37} alt="logo" />
              <div className="flex flex-col">
                <div className="flex">
                  <p className="text-white font-semibold text-xl">Nom</p>
                  <p className="text-[#EF4444] font-semibold text-xl">Nom</p>
                </div>
                <p className="text-white text-xs">Swift delivery</p>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-gray-500">NOMNOM</h1>
              <p className="text-white">Home</p>
              <p className="text-white">Contact us</p>
              <p className="text-white">Delivery zone</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
