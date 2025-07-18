import { Request, Response } from "express";
import { FoodsModel } from "../../model/food.model";

export const deleteFood = async (
    request: Request,
    response: Response
  ) => {
    const {_id} = request.body;
  
    try {
      await FoodsModel.findByIdAndDelete({_id});
      response.status(200).send("Removed food successfully");
    } catch (err) {
      response.status(400).send({ message: "Error in fetching food data", err });
    }
  };