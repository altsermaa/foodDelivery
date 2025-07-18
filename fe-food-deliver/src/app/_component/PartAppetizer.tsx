import { FoodCart } from "./FoodCart";

export type FoodProps = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  qty: number;
  ingredients: string
};

type PropsType = {
  foods: Record<string, FoodProps[]>;
};

export const PartAppetizer = ({ foods }: PropsType) => {
  const keys = Object.keys(foods);

  return (
    <div>
      <div className="flex flex-col gap-20">
        {keys.map((el, index) => {
          return (
            <div key={index}>
              <h2 className="mb-14 text-3xl text-white font-black">{el}</h2>
              <div className="grid grid-cols-3 gap-6">
                {foods[el].slice(0, 6).map((food) => {
                  return (
                    <FoodCart
                      key={food._id}
                      foodName={food.foodName}
                      price={food.price}
                      image={food.image}
                      _id={food._id}
                      qty={food.qty}
                      ingredients={food.ingredients}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
