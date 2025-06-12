import { FoodCart } from "./FoodCart";

export const PartAppetizer = () => {
  const arr = [1, 2, 3, 4, 5, 6];
  return (
    <div>
      <h1 className="mb-14 text-3xl text-white font-black">Appetizer</h1>
      <div className="grid grid-cols-3 gap-6">
        {arr.map((el) => (
          <FoodCart />
        ))}
      </div>
    </div>
  );
};
