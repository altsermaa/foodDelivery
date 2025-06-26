import { Request, Response } from "express";
import { FoodCategoryModel } from "../../model/foodCategory.model";

export const getCategories = async (_request: Request, response: Response) => {
  try {
    const allCategories = await FoodCategoryModel.find({});
    response.status(200).send({ message: "All categories", allCategories });
  } catch (err) {
    response.status(400).send({ message: "Error in fetching all orders", err });
  }
};
