import { Request, Response } from "express";
import { FoodOrderModel } from "../../model/foodOrder.model";

export const getOrder = async (_request: Request, response: Response) => {
  const { userId } = response.locals;

  try {
    const allOrdersByUserId = await FoodOrderModel.find({
      user: userId,
    }).populate({
      path: "foodOrderItems",
      populate: {
        path: "food",
        model: "Foods",
      },
    });

    response.status(200).send({
      message: "Order fetched successfully",
      orders: allOrdersByUserId,
    });
  } catch (err) {
    console.log(err);
    response.status(400).send({ message: "Cannot get orders", err });
    return;
  }
};
