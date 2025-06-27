import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pen, Trash } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FoodProps } from "./ShowFoods";

export const UpdateFood = ({ foodItemId }: { foodItemId: string }) => {
  const [singleFood, setSingleFood] = useState<FoodProps>();
  console.log(singleFood?.foodName);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getDishInfo = async () => {
      const response = await axios.post(
        "http://localhost:8000/admin/getSingleFood",
        {
          _id: foodItemId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSingleFood(response.data.result);
    };
    getDishInfo();
  }, []);

  const updateDish = () => {};
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="link">
            <Pen id={foodItemId} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Dishes info</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-6">
            <div className="flex gap-3">
              <Label htmlFor="foodName">Dish name</Label>
              <Input
                id="foodName"
                name="foodName"
                value={singleFood?.foodName}
                // onChange={handleFoodName}
              />
            </div>
            <div className="flex gap-3">
              <Label htmlFor="category">Dish category</Label>
              <Input
                id="category"
                name="category"
                value={singleFood?.foodName}
                // onChange={}
              />
            </div>
            <div className="flex gap-3">
              <Label htmlFor="ingredients">Ingredients</Label>
              <Input
                id="ingredients"
                name="ingredients"
                defaultValue="List ingredients"
                value={singleFood?.ingredients}
                //   onChange={handleIngredients}
              />
            </div>
            <div className="flex gap-3">
              <Label htmlFor="foodPrice">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={singleFood?.price}
                //   onChange={handleFoodPrice}
              />
            </div>
            <div className="flex gap-3">
              {/* <ImageUpload
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                setFile={setFile}
              /> */}
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <Trash className="text-red-600" />
            <Button type="submit" onClick={updateDish}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
