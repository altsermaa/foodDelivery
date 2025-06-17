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

// export const AddNewDish = () => {
//   const addNewDish = async (values) => {
//     try {
//       const response = await axios.post("http://localhost:8000/createFood", {
//         foodName: values.foodName,
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
//                 value={values}
//                 onChange={onChange}
//               />
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="foodPrice">Food price</Label>
//               <Input
//                 id="foodPrice"
//                 name="foodPrice"
//                 defaultValue="Enter price"
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
