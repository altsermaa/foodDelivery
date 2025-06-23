import { Router } from "express";
import { tokenChecker } from "../middleware/token-checker";
import { createOrder } from "../controller/order/create-order";

export const OrderRouter = Router();

// OrderRouter.post("/createOrder", tokenChecker, createOrder);
