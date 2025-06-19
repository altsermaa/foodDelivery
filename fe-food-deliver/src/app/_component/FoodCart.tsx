"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CirclePlus, Plus } from "lucide-react";
import Image from "next/image";
import { FoodProps } from "./PartAppetizer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const FoodCart = ({ foodName, price, image, _id }: FoodProps) => {
  return (
    <Card className="h-[342px] w-full p-4 gap-5">
      <CardDescription className="h-full w-full relative">
        <Image src={image} fill objectFit="cover" alt="foodImage" />
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button
                size="icon"
                className="absolute bottom-5 right-5 rounded-full bg-white text-[#FD543F]"
              >
                <Plus id={_id} />
              </Button>
            </DialogTrigger>
            <DialogContent className="flex h-[342px] w-full p-4 gap-5">
              <div className="h-full w-full relative">
                <Image src={image} fill objectFit="cover" alt="foodImage" />
              </div>
              <div className="w-[377px]">
                <div className="flex flex-col gap-4 mb-28">
                  <DialogTitle className="text-[#FD543F] text-2xl">
                    {foodName}
                  </DialogTitle>
                  <DialogDescription>
                    guhijokpl;gfkdjuriweokdfsl hudfso
                  </DialogDescription>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <h3>Total price</h3>
                    <p>{price}</p>
                  </div>
                  <div className="flex h-full gap-2">
                    <CirclePlus />
                    <p>1</p>
                    <CirclePlus />
                  </div>
                </div>

                <DialogFooter className="flex items-end">
                  <Button type="submit" className="w-full">
                    Add to cart
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </form>
        </Dialog>
      </CardDescription>
      <CardContent className="flex flex-col gap-2">
        <div className="flex justify-between">
          <CardTitle className="text-[#FD543F]">{foodName}</CardTitle>
          <CardTitle>{price}</CardTitle>
        </div>
        <CardFooter className="flex-col gap-2 text-sm">blaa blaa</CardFooter>
      </CardContent>
    </Card>
  );
};
