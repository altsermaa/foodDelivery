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
import axios from "axios";
import { useAuth } from "./UserProvider";
import { useCart } from "./CartProvider";
import { OrderedFood } from "./OrderedFood";
import { OrderedItem } from "./OrderedItem";
import { LogInAlert } from "./LogInAlert";
import { Input } from "@/components/ui/input";
import { z } from "zod";


const deliveryAddressSchema = z.object({
  address: z.string()
    .min(1, "Delivery address is required")});

export type LocalDataType = {
  foodName: string;
  price: number;
  image: string;
  _id: string;
  qty: number;
  ingredients: string
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
  user?: {
    address: string;
  };
};

export const Order = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const { user } = useAuth();
  const { cart, setCart, cartCount } = useCart();
  const [order, setOrder] = useState<OrderedFoodType[]>([]);
  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState<string | null>(null);

  const handleLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleOpen = () => setIsOpen(true);

  const itemsSum = cart.reduce((total, food) => total + food.price * food.qty,0)
  const shippingCost = 20

  const handleSubmit = async () => {
    if (typeof window !== "undefined") {
      const token = window?.localStorage?.getItem("token");
      if (!user.userId) {
        setShowLoginAlert(true);
        return;
      } else {
        const locationToSend = location.trim();
        
        try {
          const validatedData = deliveryAddressSchema.safeParse({ address: locationToSend });

          if (!validatedData.success) {
            setLocationError(validatedData.error.issues[0].message);
            return;
          }
          
          setLocationError(null);
          
          const backEndData = cart.map((food) => ({
            food: food._id,
            quantity: food.qty,
          }));

          const totalPrice = cart.reduce(
            (total, food) => total + food.price * food.qty,
            0
          );

          const response = await axios.post(
            "https://fooddelivery-q3yg.onrender.com/createOrder",
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
          
          const updatedLocation = {
            id: user.userId,
            address: validatedData.data.address
          };
          
          console.log(updatedLocation)
          
          const sendLocation = await axios.put(
            "https://fooddelivery-q3yg.onrender.com/updateAddress",
            updatedLocation,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              }, 
            }
          );
          
          alert("Order placed successfully");
          localStorage.setItem("location", JSON.stringify(validatedData.data.address));
          localStorage.setItem("foodCart", "[]");
          setCart([]);
          setLocationError(null);
        } catch (err: any) {
          alert(err?.response?.data?.message || "An error occurred");
          return;
        }
      }
    }
  };
  const showOrder = async () => {
    if (typeof window !== "undefined") {
      const token = window?.localStorage?.getItem("token");

      const storageKey = "location";
      const existingData = localStorage.getItem(storageKey);

      if (existingData) {
        const parsed = JSON.parse(existingData);
        setLocation(parsed);
      } else {
        setLocation(""); 
      }

      try {
        const response = await axios.get(
          "https://fooddelivery-q3yg.onrender.com/getOrder",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrder(response.data.orders);
      } catch (err: any) {
        console.error("Error fetching orders:", err);
      }
    }
  };

  useEffect(() => {
    showOrder();
  }, []);

  return (
    <>
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
              <div className="w-[20px] h-[20px] absolute z-10 rounded-full bg-red-500 ml-7 mb-8 text-white">
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
                        ingredients={food.ingredients}
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
                   <Input
                    placeholder="Please share your complete address." 
                    className={`h-[80px] ${locationError ? 'border-red-500' : ''}`}
                    value={location} 
                    onChange={handleLocation}
                  />
                  {locationError && (
                    <p className="text-red-500 text-sm mt-1">{locationError}</p>
                  )}
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
                   {itemsSum}$
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>Shipping</p>
                    <p>{shippingCost}$</p>
                  </div>
                  <div className="border-b-gray-500 border-dashed my-5"></div>
                  <div className="flex justify-between">
                    <p>Total</p>
                    { itemsSum + shippingCost}$
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
                      key={food._id}
                      foodOrderItems={food.foodOrderItems}
                      createdAt={food.createdAt}
                      orderNo={food._id.slice(0, 5)}
                      status={food.status}
                      user={food.user}
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>

      <LogInAlert 
        open={showLoginAlert} 
        onOpenChange={setShowLoginAlert} 
      />
    </>
  );
};
