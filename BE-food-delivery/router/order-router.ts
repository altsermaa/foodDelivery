import { Router } from "express";
import { tokenChecker } from "../middleware/token-checker";
import { createOrder } from "../controller/order/create-order";
import { getOrder } from "../controller/order/get-order";

export const OrderRouter = Router();

OrderRouter.post("/createOrder", tokenChecker, createOrder);
OrderRouter.get("/getOrder", tokenChecker, getOrder);
