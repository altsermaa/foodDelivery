import { Router } from "express";
import { tokenChecker } from "../middleware/token-checker";
import { isAdmin } from "../middleware/authorization";
import { getAllOrder } from "../controller/admin/get-all-order";
import { updateOrder } from "../controller/admin/update-order";
import { getCategories } from "../controller/admin/get-all-category";
import { readyFoods } from "../controller/food/ready-foods";
import { updateSingleFood } from "../controller/admin/update-single-food";
import { getSingleFood } from "../controller/admin/get-single-food";
import { deleteFood } from "../controller/admin/delete-single-food";

export const AdminRouter = Router();

AdminRouter.get("/admin/getAllOrder", [tokenChecker, isAdmin], getAllOrder);
AdminRouter.put("/admin/updateOrder", [tokenChecker, isAdmin], updateOrder);
AdminRouter.get("/admin/getCategories", [tokenChecker, isAdmin], getCategories);
AdminRouter.get("/admin/readyFoods", [tokenChecker, isAdmin], readyFoods);
AdminRouter.put(
  "/admin/updateSingleFood",
  [tokenChecker, isAdmin],
  updateSingleFood
);
AdminRouter.post("/admin/getSingleFood", [tokenChecker, isAdmin], getSingleFood);
AdminRouter.delete("/admin/deleteFood", deleteFood)
