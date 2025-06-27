import { Request, Response } from "express";
import { FoodsModel } from "../../model/food.model";

export const updateSingleFood = async (
  request: Request,
  response: Response
) => {
  const { _id, foodName, price, image, ingredients } = request.body;

  try {
    await FoodsModel.findByIdAndUpdate(
      { _id },
      {
        foodName: foodName,
        price: price,
        image: image,
        ingredients: ingredients,
      }
    );
    response.status(200).send("Updated food data successfully");
  } catch (err) {
    response.status(400).send({ message: "Error in fetching food data", err });
  }
};
