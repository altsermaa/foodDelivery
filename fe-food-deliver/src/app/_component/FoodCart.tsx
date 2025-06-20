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
import { useEffect, useState } from "react";

export type UnitDataType = {
  foodName: string;
  price: number;
  image: string;
  _id: string;
  qty: number;
};

export const FoodCart = ({ foodName, price, image, _id }: FoodProps) => {
  const [qty, setQty] = useState<number>(1);

  const minusQty = () => {
    qty > 1 && setQty((prev) => prev - 1);
  };
  const plusQty = () => {
    setQty((prev) => prev + 1);
  };

  const storageKey = "foodCart";

  const saveUnitData = () => {
    const existingData = localStorage.getItem(storageKey);
    const cartItems: UnitDataType[] = existingData
      ? JSON.parse(existingData)
      : [];

    const isFoodExisting = cartItems.find((food) => food._id === _id);

    if (isFoodExisting) {
      const newFoods = cartItems.map((food) => {
        if (food._id === _id) {
          return { ...food, qty };
        } else {
          return food;
        }
      });
      localStorage.setItem(storageKey, JSON.stringify(newFoods));
    } else {
      const newFoods = [...cartItems, { foodName, price, image, _id, qty }];
      localStorage.setItem(storageKey, JSON.stringify(newFoods));
    }
  };

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
                    <p>{price * qty}</p>
                  </div>
                  <div className="flex h-full gap-2">
                    <button type="button" onClick={minusQty}>
                      <CirclePlus />
                    </button>

                    <p>{qty}</p>
                    <button type="button" onClick={plusQty}>
                      <CirclePlus />
                    </button>
                  </div>
                </div>

                <DialogFooter className="flex items-end">
                  <Button
                    type="button"
                    className="w-full"
                    onClick={saveUnitData}
                  >
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
