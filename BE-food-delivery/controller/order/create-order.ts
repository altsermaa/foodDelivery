import { Request, Response } from "express";
import { FoodOrderModel } from "../../model/foodOrder.model";

export const createOrder = async (request: Request, response: Response) => {
  const { user, totalPrice, foodOrderItems, status } = request.body;

  if (!user || !totalPrice || !foodOrderItems || !status) {
    return response.status(400).send({ message: "Missing required fields" });
  }

  try {
    const newOrder = await FoodOrderModel.create({
      user,
      totalPrice,
      foodOrderItems,
      status,
    });

    response
      .status(200)
      .send({ message: "Order created successfully", orderId: newOrder._id });
  } catch (err) {
    response.send({ message: "Error creating order", err });
  }
};
