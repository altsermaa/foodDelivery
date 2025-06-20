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
import { ShoppingCart } from "lucide-react";
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
import { UnitDataType } from "./FoodCart";

export const Order = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const [data, setData] = useState<UnitDataType[]>([]);
  console.log(data);

  useEffect(() => {
    const storedData: any = localStorage.getItem("foodCart");
    const parsed: UnitDataType[] = JSON.parse(storedData);
    setData(parsed);
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
        </Button>
      </SheetTrigger>
      <SheetContent className="rounded-2xl bg-[#404040] border shadow-black flex flex-col gap-6">
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
            <Card>
              <CardHeader>
                <CardTitle>My cart</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                {data.map((food) => {
                  return (
                    <OrderedItem
                      key={food._id}
                      foodName={food.foodName}
                      price={food.price}
                      image={food.image}
                      qty={food.qty}
                      _id={food._id}
                    />
                  );
                })}
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
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
        <SheetFooter>
          <Button onClick={handleClose}>Close</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
