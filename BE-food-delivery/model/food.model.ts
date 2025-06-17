import mongoose, { Schema, model } from "mongoose";

const Foods = new Schema({
  foodName: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  ingredients: { type: String, required: true },
  categoryName: { type: Schema.ObjectId, required: true, ref: "FoodCategory" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


export const FoodsModel = model("Foods", Foods);
