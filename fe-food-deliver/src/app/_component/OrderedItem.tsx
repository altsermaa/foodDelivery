import { Button } from "@/components/ui/button";
import { CircleMinus, CirclePlus, CircleX } from "lucide-react";
import Image from "next/image";
import { FoodProps } from "./PartAppetizer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UnitDataType } from "./FoodCart";
import { LocalDataType } from "./Order";

export type FoodTypeProps = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  quantity: number;
  onRemove: () => void;
  setData: Dispatch<SetStateAction<LocalDataType[]>>;
};

export const OrderedItem = ({
  foodName,
  price,
  image,
  quantity,
  _id,
  onRemove,
  setData,
}: FoodTypeProps) => {
  const [qty, setQty] = useState<number>(quantity);

  const minusQty = () => {
    qty > 1 && setQty((prev) => prev - 1);
    saveUnitData();
    // setData()
  };

  const plusQty = () => {
    setQty((prev) => prev + 1);
    saveUnitData();
  };

  const deleteFood = () => {
    const storageKey = "foodCart";

    const existingData = localStorage.getItem(storageKey);
    const cartItems: UnitDataType[] = existingData
      ? JSON.parse(existingData)
      : [];

    const newFoods = cartItems.filter((food) => food._id !== _id);
    localStorage.setItem(storageKey, JSON.stringify(newFoods));

    onRemove();
  };

  const storageKey = "foodCart";
  const saveUnitData = () => {
    const existingData = localStorage.getItem(storageKey);
    const cartItems: UnitDataType[] = existingData
      ? JSON.parse(existingData)
      : [];
    const newFoods = cartItems.map((food) => {
      if (food._id === _id) {
        return { ...food, qty };
      } else {
        return food;
      }
    });
    localStorage.setItem(storageKey, JSON.stringify(newFoods));
  };

  return (
    <div>
      <div className="flex w-[439px] h-[120px] gap-2 ">
        <div className="h-full w-[124px] relative">
          <Image
            src={image}
            fill
            objectFit="cover"
            alt="foodImage"
            className="rounded-2xl"
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex h-full ">
            <div className="flex flex-col gap-4">
              <h3 className="text-[#FD543F] text-base">{foodName}</h3>
              <p className="text-xs">
                Here will be detailed description of ordered food.
              </p>
            </div>
            <div onClick={deleteFood}>
              <CircleX className="text-[#FD543F]" />
            </div>
          </div>

          <div className="flex flex-row-reverse justify-between">
            <p className="text-base">{price * qty}</p>
            <div className="flex h-full gap-2 text-lg">
              <button type="button" onClick={minusQty}>
                <CircleMinus className="border-none" />
              </button>

              <p>{qty}</p>
              <button type="button" onClick={plusQty}>
                <CirclePlus />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
