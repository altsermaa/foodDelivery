import { FoodCart } from "@/app/_component/FoodCart";
import { AddBox } from "./AddBox";
import { Button } from "@/components/ui/button";
import { AddNewDish } from "./AddNewDish";
import { Dispatch, SetStateAction } from "react";
import { ShowSingleFood } from "./ShowSingleFood";
import { PropsType } from "../page";

export const ShowFoods = ({ foods, setFoods, categories }: PropsType & { categories: any[] }) => {
  const keys = Object.keys(foods);

  return (
    <div>
      <div className="flex flex-col gap-20">
        {keys.map((el, index) => (
          <div key={index}>
            <h2 className="mb-14 text-3xl text-black font-black">
              {el} ({foods[el].length})
            </h2>
            <div className="grid grid-cols-4 items-center gap-6">
              <AddNewDish
                categoryId={foods[el][0].categoryId}
                categoryName={el}
                setFoods={setFoods}
                categories={categories}
              />

              {foods[el].map((food) => (
                <ShowSingleFood
                  key={food._id}
                  foodName={food.foodName}
                  price={food.price}
                  image={food.image}
                  _id={food._id}
                  ingredients={food.ingredients}
                  categories={categories}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
