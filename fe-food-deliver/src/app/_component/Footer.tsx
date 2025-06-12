import { Button } from "@/components/ui/button";
import { ShoppingCart, UserRound } from "lucide-react";
import Image from "next/image";
import { InputSearch } from "./InputSearch";
import { Email } from "./Email";

export const Footer = () => {
  return (
    <div className="w-screen h-fit bg-[#18181B] pt-16">
      <div className="w-full h-[29px] bg-[#EF4444] text-white">
        Fresh fast delivered
      </div>
      <div className="mx-auto mt-20"></div>
    </div>
  );
};
