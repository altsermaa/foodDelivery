import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrderedItem } from "./OrderedItem";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useAuth } from "./UserProvider";
import { useCart } from "./CartProvider";
import { OrderedFood } from "./OrderedFood";
import { LogInAlert } from "./LogInAlert";

export type LocalDataType = {
  foodName: string;
  price: number;
  image: string;
  _id: string;
  qty: number;
};

type FoodType = {
  price: number;
  categoryId: string;
  createdAt: Date;
  foodName: string;
  image: string;
  ingredients: string;
  updatedAt: Date;
  __v: number;
  _id: string;
};

export type FoodOrderItemsType = {
  food: FoodType;
  quantity: number;
};

enum FoodOrderEnum {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}

type OrderedFoodType = {
  totalPrice: number;
  orderNo: string;
  status: FoodOrderEnum;
  foodOrderItems: FoodOrderItemsType[];
  createdAt: Date;
  _id: string;
};

export const Order = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { cart, setCart, cartCount } = useCart();
  const [order, setOrder] = useState<OrderedFoodType[]>([]);

  const handleOpen = () => setIsOpen(true);

  const handleSubmit = async () => {
    if (typeof window !== "undefined") {
      const token = window?.localStorage?.getItem("token");
      if (!user.userId) {
        <LogInAlert />;
      } else {
        const backEndData = cart.map((food) => ({
          food: food._id,
          quantity: food.qty,
        }));

        const totalPrice = cart.reduce(
          (total, food) => total + food.price * food.qty,
          0
        );

        try {
          const response = await axios.post(
            "http://localhost:8000/createOrder",
            {
              user: user.userId,
              foodOrderItems: backEndData,
              totalPrice,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert("Order placed successfully");
          localStorage.setItem("foodCart", "[]");
          setCart([]);
        } catch (err: any) {
          alert(err?.response?.data?.message);
        }
      }
    }
  };
  const showOrder = async () => {
    if (typeof window !== "undefined") {
      const token = window?.localStorage?.getItem("token");

      try {
        const response = await axios.get("http://localhost:8000/getOrder", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.orders);
        setOrder(response.data.orders);
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  useEffect(() => {
    console.log("hi");
    showOrder();
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="rounded-2xl"
          variant="outline"
          size="icon"
          onClick={handleOpen}
        >
          <ShoppingCart />
          {cartCount !== 0 && (
            <div className="w-[20px] h-[20px] absolute z-10 rounded-full bg-red-500 ml-7  mb-8">
              {cartCount}
            </div>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="rounded-2xl bg-[#404040] border shadow-black flex flex-col gap-6 w-fit overflow-scroll">
        <SheetHeader>
          <SheetTitle className="flex text-white gap-2">
            <ShoppingCart className="text-sm" />
            <p>Order detail</p>
          </SheetTitle>
        </SheetHeader>
        <Tabs defaultValue="Cart" className="w-full px-6">
          <TabsList>
            <TabsTrigger value="Cart">Cart</TabsTrigger>
            <TabsTrigger value="Order">Order</TabsTrigger>
          </TabsList>
          <TabsContent value="Cart">
            <Card className="w-[471px]">
              <CardHeader>
                <CardTitle>My cart</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                {cart.map((food) => {
                  return (
                    <OrderedItem
                      setCart={setCart}
                      key={food._id}
                      foodName={food.foodName}
                      price={food.price}
                      image={food.image}
                      quantity={food.qty}
                      _id={food._id}
                      onRemove={() => {
                        setCart((prev) =>
                          prev.filter((item) => item._id !== food._id)
                        );
                      }}
                    />
                  );
                })}
                <div className="grid w-full gap-3">
                  <Label htmlFor="message">Delivery address</Label>
                  <Textarea
                    placeholder="Please share your complete address"
                    id="message"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="w-[471px] mt-6">
              <CardHeader>
                <CardTitle>Payment Info</CardTitle>
              </CardHeader>
              <CardContent className="my-5 w-[439px]">
                <div className="flex justify-between">
                  <p>Items</p>
                  {/* {data.reduce(
                    (total, food) => total + food.price * food.qty,
                    0
                  )} */}
                </div>
                <div className="flex justify-between mt-2">
                  <p>Shipping</p>
                  <p>{1000}₮</p>
                </div>
                <div className="border-b-gray-500 border-dashed my-5"></div>
                <div className="flex justify-between">
                  <p>Total</p>
                  {cart.reduce(
                    (total, food) => total + food.price * food.qty,
                    0
                  )}
                </div>
              </CardContent>
              <CardFooter className="w-full">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleSubmit}
                >
                  Checkout
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="Order">
            <Card className="w-[471px]">
              <CardHeader>
                <CardTitle>Order history</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                {order?.map((food) => (
                  <OrderedFood
                    foodOrderItems={food.foodOrderItems}
                    createdAt={food.createdAt}
                    orderNo={food._id.slice(0, 5)}
                    status={food.status}
                  />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
