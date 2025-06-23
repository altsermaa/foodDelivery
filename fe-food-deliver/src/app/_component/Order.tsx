import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Car, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrderedItem } from "./OrderedItem";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useAuth } from "./UserProvider";

export type LocalDataType = {
  foodName: string;
  price: number;
  image: string;
  _id: string;
  qty: number;
};

export const Order = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const handleOpen = () => setIsOpen(true);

  const [data, setData] = useState<LocalDataType[]>([]);
  console.log(data);

  useEffect(() => {
    const storedData: any = localStorage.getItem("foodCart");
    const parsed: LocalDataType[] = JSON.parse(storedData);
    setData(parsed);
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/createOrder", {
        user: user.userId,
        totalPrice: data.price,
      });
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

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
        </Button>
      </SheetTrigger>
      <SheetContent className="rounded-2xl bg-[#404040] border shadow-black flex flex-col gap-6 w-fit">
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
            <Card className="w-fit">
              <CardHeader>
                <CardTitle>My cart</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                {data.map((food) => {
                  return (
                    <OrderedItem
                      setData={setData}
                      key={food._id}
                      foodName={food.foodName}
                      price={food.price}
                      image={food.image}
                      quantity={food.qty}
                      _id={food._id}
                      onRemove={() => {
                        setData((prev) =>
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
            <Card className="w-fit mt-6">
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
                  {data.reduce(
                    (total, food) => total + food.price * food.qty,
                    0
                  )}
                </div>
              </CardContent>
              <CardFooter className="w-full">
                <Button
                  variant="destructive"
                  className="w-full"
                  // onClick={handleSubmit}
                >
                  Checkout
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="Order">
            <Card>
              <CardHeader>
                <CardTitle>Order</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you&apos;re
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-name">Name</Label>
                  <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-username">Username</Label>
                  <Input id="tabs-demo-username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
