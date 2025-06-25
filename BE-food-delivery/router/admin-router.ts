import { Router } from "express";
import { OrderRouter } from "./order-router";
import { tokenChecker } from "../middleware/token-checker";
import { isAdmin } from "../middleware/authorization";
import { getAllOrder } from "../controller/admin/get-all-order";
import { updateOrder } from "../controller/admin/update-order";

export const AdminRouter = Router();

AdminRouter.get("/admin/getAllOrder", [tokenChecker, isAdmin], getAllOrder);
AdminRouter.put("/admin/updateOrder", [tokenChecker, isAdmin], updateOrder);
