import express, { Request, response, Response } from "express";
import { FoodsModel } from "../../model/food.model";

export const readyFoods = async (_request: Request, response: Response) => {
  try {
    const readyFoods = await FoodsModel.aggregate([
      {
        $lookup: {
          from: "foodcategories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: "$categoryInfo",
      },
      {
        $group: {
          _id: "$categoryInfo.categoryName",
          foods: {
            $push: {
              _id: "$_id",
              foodName: "$foodName",
              image: "$image",
              price: "$price",
              ingredients: "$ingredients",
            },
          },
        },
      },
    ]);

    const groupByCategory = readyFoods.reduce((acc, item) => {
      acc[item._id] = item.foods;
      return acc;
    }, {});

    response.send({ foods: groupByCategory });
  } catch (err) {
    response.send(err);
  }
};
