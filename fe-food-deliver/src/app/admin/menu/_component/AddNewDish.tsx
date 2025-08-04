import { Button } from "@/components/ui/button";
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
import axios from "axios";
import { AddBox } from "./AddBox";
import { ImageUpload } from "./ImageUpload";
import { Dispatch, SetStateAction, useState } from "react";
import { FoodProps } from "../page";

export type AddNewType = {
  imageUrl: string | null;
  setImageUrl: Dispatch<SetStateAction<string | null>>;
  setFile: Dispatch<SetStateAction<File | null>>;
};

export const AddNewDish = ({
  categoryId,
  setFoods,
  categoryName,
  categories,
}: {
  categoryId: string;
  setFoods: Dispatch<SetStateAction<Record<string, FoodProps[]>>>;
  categoryName: string;
  categories: any[];
}) => {
  const [foodName, setFoodName] = useState("");
  const handleFoodName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFoodName(event.target.value);
  };

  const [selectedCategory, setSelectedCategory] = useState(categoryId);
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const [price, setPrice] = useState<number | undefined>(undefined);
  const handleFoodPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  const [ingredients, setIngredients] = useState("");
  const handleIngredients = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIngredients(event.target.value);
  };

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const addNewDish = async () => {
    try {
      if (!file) {
        alert("Please select a file");
        return null;
      }

      if (!selectedCategory) {
        alert("Please select a category");
        return null;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "fooddelivery");

      const result = await fetch(
        "https://api.cloudinary.com/v1_1/dz8b3asdf/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const img = await result.json();
      await axios.post("https://fooddelivery-q3yg.onrender.com/createFood", {
        foodName: foodName,
        price: price,
        image: img.secure_url,
        ingredients: ingredients,
        categoryId: selectedCategory,
      });

      alert("Dish added successfully!");
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="link">
            <AddBox />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new Dish </DialogTitle>
          </DialogHeader>
          <div className="flex gap-6">
            <div className="grid gap-3">
              <Label htmlFor="foodName">Food name</Label>
              <Input
                id="foodName"
                name="foodName"
                placeholder="Type food name"
                value={foodName}
                onChange={handleFoodName}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="foodPrice">Food price</Label>
              <Input
                id="foodPrice"
                name="foodPrice"
                placeholder="Enter price"
                type="number"
                value={price}
                onChange={handleFoodPrice}
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="ingredients">Ingredients</Label>
              <Input
                id="ingredients"
                name="ingredients"
                placeholder="List ingredients"
                value={ingredients}
                onChange={handleIngredients}
              />
            </div>
            <div className="grid gap-3">
              <ImageUpload
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                setFile={setFile}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={addNewDish}>
              Add dish
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
