import { AlarmClock, Map, Soup } from "lucide-react";

type FoodType = {
  foodName: string, 
  price: number
}

type FoodOrderItemsType = {
  food: FoodType,
  quantity: number
}

enum FoodOrderEnum {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}

type OrderedFoodType ={
  foodName: string, 
  orderNo: string, 
  status: FoodOrderEnum, 
  quantity: number, 
  createdAt: Date, 
  totalPrice: number,
  _id: string
}

export const OrderedFood = ({ foodName, quantity, totalPrice, orderNo, status, createdAt }: OrderedFoodType) => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-1">
          <p>{totalPrice}</p>
          <p>{orderNo}</p>
        </div>

        <p>{status}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-1">
          <Soup />
          <p>{foodName}</p>
        </div>
        <p>x {quantity}</p>
      </div>
      <div className="flex justify-between">
        <AlarmClock />
        {/* <p>{createdAt}</p> */}
      </div>
      <div>
        <Map />
        <p>address</p>
      </div>
    </div>
  );
};
