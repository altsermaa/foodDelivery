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
import { Plus } from "lucide-react";
import Image from "next/image";
import { FoodType } from "./PartAppetizer";

export const FoodCart = ({ foodName }: FoodType) => {
  return (
    <Card className="h-[342px] w-full p-4 gap-5">
      <CardDescription className="h-full w-full relative">
        <Image src="/foodImage.png" fill objectFit="cover" alt="foodImage" />
        <Button
          size="icon"
          className="absolute bottom-5 right-5 rounded-full bg-white text-[#FD543F]"
        >
          <Plus />
        </Button>
      </CardDescription>
      <CardContent className="flex flex-col gap-2">
        <div className="flex justify-between">
          <CardTitle className="text-[#FD543F]">{foodName}</CardTitle>
          <CardTitle>$12.99</CardTitle>
        </div>
        <CardFooter className="flex-col gap-2 text-sm">
          Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.
        </CardFooter>
      </CardContent>
    </Card>
  );
};
