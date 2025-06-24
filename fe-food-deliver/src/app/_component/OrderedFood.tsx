import { AlarmClock, Map, Soup } from "lucide-react";

export const OrderedFood = ({ totalPrice, orderNo, status, createdDate }) => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-1">
          <p>totalPrice</p>
          <p>orderNo</p>
        </div>

        <p>status</p>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-1">
          <Soup />
          <p>foodName</p>
        </div>
        <p>X quantity</p>
      </div>
      <div className="flex justify-between">
        <AlarmClock />
        <p>createdDate</p>
      </div>
      <div>
        <Map />
        <p>address</p>
      </div>
    </div>
  );
};
