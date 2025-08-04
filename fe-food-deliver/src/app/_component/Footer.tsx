"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart, UserRound } from "lucide-react";
import Image from "next/image";
import { InputSearch } from "./InputSearch";
import { Email } from "./Email";
import { useAuth } from "./UserProvider";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const { user } = useAuth();
  const text = ["Fresh fast delivered", "Fresh fast delivered", "Fresh fast delivered", "Fresh fast delivered", "Fresh fast delivered", "Fresh fast delivered", "Fresh fast delivered", "Fresh fast delivered" , "Fresh fast delivered"]

    const pathname = usePathname();
  
    const paths = ["/login", "/signUp", "/admin/menu", "/admin/orders"]

  return (
    <div>
      {paths.includes(pathname) ? null : (
        <div className="w-screen h-fit bg-[#18181B] pt-16">
          <div className="w-full h-[29px] bg-[#EF4444] text-white py-6 font-black flex items-center overflow-hidden">
            
              <motion.div 
              className="whitespace-nowrap text-2xl flex"
              animate={{ x: [-100, -300] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {text.map((el, index) => (
                <span key={index} className="mr-8">
                  {el}
                </span>
              ))}
            </motion.div>
          </div>
          <div className="mx-auto pt-20 pb-24 px-24 flex">
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
            <div className="ml-35 flex flex-col">
              <h1 className="text-gray-500">Menu</h1>
              <p className="text-white">Appetizers</p>
              <p className="text-white">Salads</p>
              <p className="text-white">Pizzas</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
