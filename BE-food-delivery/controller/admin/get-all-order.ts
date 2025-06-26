import { Request, Response } from "express";
import { FoodOrderModel } from "../../model/foodOrder.model";

export const getAllOrder = async (request: Request, response: Response) => {
  try {
    const allOrders = await FoodOrderModel.find({}).populate({
      path: "foodOrderItems",
      populate: {
        path: "food",
        model: "Foods",
      },
    }).populate({
      path: "user",
      model: "Users"
    })
    response.status(200).send({ message: "All orders in database", allOrders });
  } catch (err) {
    response.status(400).send({ message: "Error in fetching all orders", err });
  }
};
