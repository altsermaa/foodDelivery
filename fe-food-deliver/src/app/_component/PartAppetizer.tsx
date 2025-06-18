import axios from "axios";
import { FoodCart } from "./FoodCart";
import { useEffect, useState } from "react";

export type FoodType = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
};

export const PartAppetizer = () => {
  const arr = [1, 2, 3, 4, 5, 6];
  const [foods, setFoods] = useState<FoodType[]>([]);

  useEffect(() => {
    const response = async () => {
      const result = await axios.get("http://localhost:8000/readyFoods");
      setFoods(result.data.foods.hool);
    };
    response();
  }, []);

  console.log("hi", foods);
  return (
    <div>
      <h1 className="mb-14 text-3xl text-white font-black">Appetizer</h1>
      <div className="grid grid-cols-3 gap-6">
        {foods.map((el, id) => (
          <FoodCart key={el.id} foodName={el.foodName} />
        ))}
      </div>
      {/* <button onClick={response}>hii</button> */}
    </div>
  );
};
