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
import { CirclePlus, Pen, Plus } from "lucide-react";
import Image from "next/image";
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
import { useState } from "react";
import { UpdateFood } from "./UpdateFood";

export type UnitDataType = {
  foodName: string;
  price: number;
  image: string;
  _id: string;
};

export const ShowSingleFood = ({
  foodName,
  price,
  image,
  _id,
}: UnitDataType) => {

  return (
    <Card className="h-[342px] w-full p-4 gap-5">
      <CardDescription className="h-full w-full relative">
        <Image src={image} fill objectFit="cover" alt="foodImage" />
        <Button
          size="icon"
          className="absolute bottom-5 right-5 rounded-full bg-white text-[#FD543F]"
        >
          <UpdateFood foodItemId={_id} />
        </Button>
      </CardDescription>
      <CardContent className="flex flex-col gap-2">
        <div className="flex justify-between">
          <CardTitle className="text-[#FD543F]">{foodName}</CardTitle>
          <CardTitle>{price}</CardTitle>
        </div>
        <CardFooter className="flex-col gap-2 text-sm">
          Here will be description of food details.
        </CardFooter>
      </CardContent>
    </Card>
  );
};
