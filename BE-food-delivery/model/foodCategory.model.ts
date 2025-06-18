import mongoose, { Schema, model } from "mongoose";

const FoodCategory = new Schema({
  categoryName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

FoodCategory.index({ categoryName: 1 }, { unique: true });

export const FoodCategoryModel = model("FoodCategories", FoodCategory);
