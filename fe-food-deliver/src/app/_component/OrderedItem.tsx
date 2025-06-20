import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Image from "next/image";
import { FoodProps } from "./PartAppetizer";
import { useEffect, useState } from "react";
import { UnitDataType } from "./FoodCart";

export type FoodTypeProps = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  qty: number;
};

export const OrderedItem = ({ foodName, price, image, _id }: FoodTypeProps) => {
  const [qty, setQty] = useState<number>(1);

  const minusQty = () => {
    qty > 1 && setQty((prev) => prev - 1);
  };
  const plusQty = () => {
    setQty((prev) => prev + 1);
  };

  return (
    <div>
      <div className="flex h-[120px] w-full gap-2">
        <div className="h-full w-full relative">
          <Image src={image} fill objectFit="cover" alt="foodImage" />
        </div>
        <div className="w-[377px]">
          <div className="flex flex-col gap-4 mb-28">
            <h3 className="text-[#FD543F] text-2xl">{foodName}</h3>
            <p>guhijokpl;gfkdjuriweokdfsl hudfso</p>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col">
              <h3>Total price</h3>
              <p>{price}</p>
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

          <div className="flex items-end">
            <Button type="submit" className="w-full">
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
