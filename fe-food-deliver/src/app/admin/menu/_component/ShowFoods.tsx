import { FoodCart } from "@/app/_component/FoodCart";
import { AddBox } from "./AddBox";
import { Button } from "@/components/ui/button";
import { AddNewDish } from "./AddNewDish";
import { Dispatch, SetStateAction } from "react";
import { ShowSingleFood } from "./ShowSingleFood";

export type FoodProps = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  // qty: number;
  ingredients: string;
  categoryId: string;
};

export type PropsType = {
  foods: Record<string, FoodProps[]>;
  setFoods: Dispatch<SetStateAction<any[]>>;
};

export const ShowFoods = ({ foods, setFoods }: PropsType) => {
  const keys = Object.keys(foods);

  return (
    <div>
      <div className="flex flex-col gap-20">
        {keys.map((el, index) => (
          <div key={index}>
            <h2 className="mb-14 text-3xl text-black font-black">
              {el} ({foods[el].length})
            </h2>
            <div className="grid grid-cols-5 items-center gap-6">
              <AddNewDish
                categoryId={foods[el][0].categoryId}
                categoryName={el}
                setFoods={setFoods}
              />

              {foods[el].map((food) => (
                <ShowSingleFood
                  key={food._id}
                  foodName={food.foodName}
                  price={food.price}
                  image={food.image}
                  _id={food._id}
                  // qty={food.qty}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
