import { Request, Response } from "express";
import { FoodsModel } from "../../model/food.model";

export const getSingleFood = async (request: Request, response: Response) => {
  const { _id } = request.body;

  try {
    const result = await FoodsModel.findById({ _id });
    response
      .status(200)
      .send({ message: "Fetched food data successfully", result });
  } catch (err) {
    response.status(400).send({ message: "Error in fetching food data", err });
  }
};
