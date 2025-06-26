import { FoodCart } from "@/app/_component/FoodCart";

export type FoodProps = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  qty: number;
};

type PropsType = {
  foods: Record<string, FoodProps[]>;
};

export const ShowFoods = ({ foods }: PropsType) => {
  const keys = Object.keys(foods);
  console.log(keys);
  console.log(foods);

  return (
    <div>
      <div className="flex flex-col gap-20">
        {keys.map((el, index) => (
          <div key={index}>
            <h2 className="mb-14 text-3xl text-black font-black">
              {el} ({foods[el].length})
            </h2>
            <div className="grid grid-cols-5 gap-6">
              {foods[el].map((food) => (
                <FoodCart
                  key={food._id}
                  foodName={food.foodName}
                  price={food.price}
                  image={food.image}
                  _id={food._id}
                  qty={food.qty}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
