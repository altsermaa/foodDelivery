import express, { Request, response, Response } from "express";
import { FoodCategoryModel } from "../../model/foodCategory.model";

export const createCategory = async (request: Request, response: Response) => {
  const { categoryName } = request.body;
  try {
    const isCategoryExisted = await FoodCategoryModel.findOne({ categoryName });

    if (!isCategoryExisted) {
      await FoodCategoryModel.create({ categoryName });
      response.send({ message: "Successfully created category" });
      return;
    }
    response.status(400).send({ message: "This category already exists" });
  } catch (err) {
    response.send(err);
  }
};
