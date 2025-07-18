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
import { FoodProps } from "../page";

export type NewDish = {
  foodName: string | undefined;
  price: number | undefined;
  ingredients: string;
  image: string;
  categoryId: string;
};

export const UpdateFood = ({ foodItemId }: { foodItemId: string }) => {
  const [singleFood, setSingleFood] = useState<FoodProps>();
  console.log(singleFood?.foodName);

  const [foodName, setFoodName] = useState("");
  const handleFoodName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFoodName(event.target.value);
  };

  const [category, setCategory] = useState("");
  const handleCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFoodName(event.target.value);
  };

  const [price, setPrice] = useState<number | undefined>(undefined);
  const handleFoodPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  const [ingredients, setIngredients] = useState("");
  const handleIngredients = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIngredients(event.target.value);
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    const getDishInfo = async () => {
      const response = await axios.post(
        "https://fooddelivery-q3yg.onrender.com/admin/getSingleFood",
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
      setFoodName(response.data.result.foodName)
      setCategory(response.data.result.categoryName)
      setPrice(response.data.result.price); 
      setIngredients(response.data.result.ingredients);
    };
    getDishInfo();
  }, [foodItemId]);

  const updateDish = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        "https://fooddelivery-q3yg.onrender.com/admin/updateSingleFood",
        {
          _id: foodItemId,
          foodName: foodName,
          price: price,
          image:
            "https://res.cloudinary.com/dz8b3asdf/image/upload/v1750038968/cld-sample-4.jpg",
          ingredients: ingredients,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Dish updated successfully");
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  const deleteDish = async() => {
    try{
      await axios.delete("http://localhost:8000/admin/deleteFood", 
        {
          data: {_id:foodItemId}
        }, 

      )
    }catch(err:any) {
      alert(err.response.data.message);
    }
  }

  if (!singleFood) return null;

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
                value={foodName}
                onChange={handleFoodName}
              />
            </div>
            <div className="flex gap-3">
              <Label htmlFor="category">Dish category</Label>
              <Input
                id="category"
                name="category"
                value={category}
                onChange={handleCategory}
              />
            </div>
            <div className="flex gap-3">
              <Label htmlFor="ingredients">Ingredients</Label>
              <Input
                id="ingredients"
                name="ingredients"
                defaultValue="List ingredients"
                value={ingredients}
                onChange={handleIngredients}
              />
            </div>
            <div className="flex gap-3">
              <Label htmlFor="foodPrice">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={price}
                onChange={handleFoodPrice}
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
            <Trash className="text-red-600" onClick={deleteDish}/>
            <Button type="submit" onClick={updateDish}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
