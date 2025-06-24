import { Request, Response } from "express";
import { FoodOrderModel } from "../../model/foodOrder.model";

export const createOrder = async (request: Request, response: Response) => {
  const { totalPrice, foodOrderItems } = request.body;
  const { userId } = response.locals;

  try {
    await FoodOrderModel.create({
      user: userId,
      totalPrice,
      foodOrderItems,
    });

    response.status(200).send({ message: "Order created successfully" });
  } catch (err) {
    response.send({ message: "Error creating order", err });
  }
};
