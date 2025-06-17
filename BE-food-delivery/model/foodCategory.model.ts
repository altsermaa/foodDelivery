import mongoose, { Schema, model } from "mongoose";

const FoodCategory = new Schema({
  categoryName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const FoodCategoryModel = model("FoodCategory", FoodCategory);
