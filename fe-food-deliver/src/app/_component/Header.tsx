"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart, UserRound } from "lucide-react";
import Image from "next/image";
import { InputSearch } from "./InputSearch";
import { Email } from "./Email";
import { useAuth } from "./UserProvider";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect, useRef } from "react";
import { Order } from "./Order";
import Link from "next/link";

export const Header = () => {
  const { user, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleSignOut = () => {
    signOut();
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div>
      {
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

            <Order />

            <Button className="rounded-2xl" variant="destructive" size="icon" onClick={toggleDropdown}>
              <UserRound />
            </Button>
          </div>
          {showDropdown && (
            <div className="absolute top-15 right-6 bg-white rounded-md shadow-md p-4 z-50 space-y-2" ref={dropdownRef}>
              {!user.userId ? (
                <Link href="/login">
                  <Button variant="secondary" className="w-full">
                    Login
                  </Button>
                </Link>
              ) : (
                <>
                  <div className="w-[188px] h-fit bg-white rounded-xl p-4 gap-2 text-center">
                    <p className="font-black">{user.email}</p>
                  </div>
                  <Button variant="secondary" className="w-full" onClick={handleSignOut}>
                    Sign out
                  </Button>
                </>
              )}
            </div>
          )}

        </div>
      }
    </div>
  );
};
