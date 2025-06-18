// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import axios from "axios";
// import { useState } from "react";

// export type NewDish = {
//   foodName: string;
//   price: number | undefined;
//   ingredients: string;
// };

// export const AddNewDish = () => {
//   const [foodName, setFoodName] = useState("");
//   const handleFoodName = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFoodName(event.target.value);
//   };

//   const [price, setPrice] = useState<number | undefined>(undefined);
//   const handleFoodPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPrice(Number(event.target.value));
//   };

//   const [ingredients, setIngredients] = useState("");
//   const handleIngredients = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setIngredients(event.target.value);
//   };

//   const addNewDish = async ({ foodName, price }: NewDish) => {
//     try {
//       const response = await axios.post("http://localhost:8000/createFood", {
//         foodName: foodName,
//         price: price,
//       });
//     } catch (err: any) {
//       alert(err.response.data.message);
//     }
//   };

//   return (
//     <Dialog>
//       <form>
//         <DialogTrigger asChild>
//           <Button variant="outline">Add new dish</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Add new Dish to Appetizers</DialogTitle>
//           </DialogHeader>
//           <div className="flex gap-6">
//             <div className="grid gap-3">
//               <Label htmlFor="foodName">Food name</Label>
//               <Input
//                 id="foodName"
//                 name="foodName"
//                 defaultValue="Type food name"
//                 value={foodName}
//                 onChange={handleFoodName}
//               />
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="foodPrice">Food price</Label>
//               <Input
//                 id="foodPrice"
//                 name="foodPrice"
//                 defaultValue="Enter price"
//                 type="number"
//                 value={price}
//                 onChange={handleFoodPrice}
//               />
//             </div>
//           </div>
//           <div className="grid gap-4">
//             <div className="grid gap-3">
//               <Label htmlFor="ingredients">Ingredients</Label>
//               <Input
//                 id="ingredients"
//                 name="ingredients"
//                 defaultValue="List ingredients"
//                 value={ingredients}
//                 onChange={handleIngredients}
//               />
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="foodImage">Food Image</Label>
//               <Input
//                 id="foodImage"
//                 name="foodImage"
//                 defaultValue="Choose a file or drag & drop it here"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button type="submit" onClick={addNewDish}>
//               Add dish
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </form>
//     </Dialog>
//   );
// };
