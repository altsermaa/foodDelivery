import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { CirclePlus, Plus } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { Button } from "@/components/ui/button";

type CategoryType = {
  categoryName: string;
  _id: string;
};

type ShowCategoriesType = {
  categories: CategoryType[];
};

export const ShowCategories = ({ categories }: ShowCategoriesType) => {
  const [categoryName, setCategoryName] = useState("")
  const handleCategoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const addCategory = async() => {
    try{
      await axios.post("https://fooddelivery-q3yg.onrender.com/createCategory", {
        categoryName: categoryName
      }

      )
    }catch(err:any) {
      alert(err.response.data.message);
    }
  }

  return (
    <div className="flex flex-col p-6 gap-4 border border-gray-300 rounded-2xl my-15">
      <h1 className="mb-4 text-3xl text-black font-black">Category</h1>
      <div className="flex gap-2">
        {categories.map((category) => {
        return (
          <Badge variant="outline" key={category._id}>
            {" "}
            {category.categoryName}
          </Badge>
        );
      })}
      <Dialog>
        <DialogTrigger>
          <CirclePlus className="text-red-600"/>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <Label htmlFor="name-1">Name</Label>
            <Input id="name-1" name="name" placeholder="Type category name" value={categoryName} onChange={handleCategoryName} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={addCategory}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
       
      </Dialog>
      
      </div>
      
    </div>
  );
};
