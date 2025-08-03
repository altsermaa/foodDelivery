import { AlarmClock, Map, Soup } from "lucide-react";
import { FoodOrderItemsType } from "./Order";
import { format } from "date-fns";

enum FoodOrderEnum {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}

type OrderedFoodType = {
  orderNo: string;
  status: FoodOrderEnum;
  createdAt: Date;
  foodOrderItems: FoodOrderItemsType[];
  user?: {
    address: string;
  };
};

export const OrderedFood = ({
  orderNo,
  status,
  createdAt,
  foodOrderItems,
  user,
}: OrderedFoodType) => {
  const itemtotalPrice = foodOrderItems.reduce((acc, item) => {
    if (!item.food) {
      return acc;
    }
    return (acc += item.food.price * item.quantity);
  }, 0);
  
  const validFoodItems = foodOrderItems.filter(item => item.food !== null);
  
  return (
    <div>
      {validFoodItems.map((item, index) => {
        return (
          <div key={index}>
            <div className="flex justify-between">
              <div className="flex gap-1 font-black">
                <p>{itemtotalPrice.toFixed(2)}</p>
                <p>({orderNo})</p>
              </div>

              <p className="border rounded-2xl border-red-500 p-3">{status}</p>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-1">
                <Soup />
                <p>{item.food.foodName || "Unknown food"} </p>
              </div>
              <p>x {item.quantity}</p>
            </div>
            <div className="flex gap-1">
              <AlarmClock />
              <p>{format(new Date(createdAt), "yyyy-MM-dd")}</p>
            </div>
            <div className="flex gap-1">
              <Map />
              <p>{user?.address || "No address available"}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
