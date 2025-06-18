import { Request, Response } from "express";
import { FoodsModel } from "../../model/food.model";
import { FoodCategoryModel } from "../../model/foodCategory.model";

export const createFood = async (request: Request, response: Response) => {
  const { foodName, price, image, ingredients, categoryId } = request.body;

  try {
    const isFoodExisted = await FoodsModel.findOne({ foodName });

    if (!isFoodExisted) {
      await FoodsModel.create({
        foodName,
        price,
        image,
        ingredients,
        categoryId,
      });
      response.send({ message: "Successfully created new food" });
      return;
    }

    response.status(400).send({ message: "This food already exists" });
  } catch (err) {
    response.send(err);
  }
};
