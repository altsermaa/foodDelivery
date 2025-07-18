import { Router } from "express";
import { createFood } from "../controller/food/create-food";
import { tokenChecker } from "../middleware/token-checker";
import { createCategory } from "../controller/food/createCategory";
import { readyFoods } from "../controller/food/ready-foods";

export const FoodRouter = Router();

FoodRouter.post("/createFood", createFood);
FoodRouter.post("/createCategory", createCategory);
FoodRouter.get("/readyFoods", readyFoods);
