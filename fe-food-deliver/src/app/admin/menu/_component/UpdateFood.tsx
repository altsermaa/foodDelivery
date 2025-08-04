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

export const UpdateFood = ({ foodItemId, categories }: { foodItemId: string; categories: any[] }) => {
  const [singleFood, setSingleFood] = useState<FoodProps>();

  const [foodName, setFoodName] = useState("");
  const handleFoodName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFoodName(event.target.value);
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
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
      setSelectedCategory(response.data.result.categoryId)
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
          categoryId: selectedCategory,
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
      alert("Dish has been deleted");
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
              <select
                id="category"
                name="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
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
            <Button 
              variant="destructive" 
              size="icon" 
              onClick={deleteDish}
              className="flex items-center justify-center"
            >
              <Trash className="h-4 w-4" />
            </Button>
            <Button type="submit" onClick={updateDish}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
