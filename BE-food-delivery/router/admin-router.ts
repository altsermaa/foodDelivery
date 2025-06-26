import { Router } from "express";
import { tokenChecker } from "../middleware/token-checker";
import { isAdmin } from "../middleware/authorization";
import { getAllOrder } from "../controller/admin/get-all-order";
import { updateOrder } from "../controller/admin/update-order";
import { getCategories } from "../controller/admin/get-all-category";
import { readyFoods } from "../controller/food/ready-foods";

export const AdminRouter = Router();

AdminRouter.get("/admin/getAllOrder", [tokenChecker, isAdmin], getAllOrder);
AdminRouter.put("/admin/updateOrder", [tokenChecker, isAdmin], updateOrder);
AdminRouter.get("/admin/getCategories", [tokenChecker, isAdmin], getCategories);
AdminRouter.get("/admin/readyFoods", [tokenChecker, isAdmin], readyFoods);
