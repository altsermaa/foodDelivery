import mongoose, { Schema, model } from "mongoose";

export type Foods = {
  _id: Schema.Types.ObjectId;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  categoryId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const Foods = new Schema({
  foodName: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  ingredients: { type: String, required: true },
  categoryId: { type: Schema.ObjectId, required: true, ref: "FoodCategory" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

Foods.index({ foodName: 1 }, { unique: true });

export const FoodsModel = model<Foods>("Foods", Foods);
