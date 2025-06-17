import mongoose, { Schema, model } from "mongoose";

const FoodOrderItem = new Schema(
  {
    food: [{ type: Schema.ObjectId, required: true, ref: "Foods" }],
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

enum FoodOrderEnum {
  PENDING,
  CANCELLED,
  DELIVERED,
}

const FoodOrder = new Schema({
  user: { type: Schema.ObjectId, required: true, ref: "Users" },
  totalPrice: { type: Number, required: true },
  foodOrderItems: [{ type: [FoodOrderItem], required: true }],
  status: {
    type: String,
    enum: ["PENDING", "CANCELLED", "DELIVERED"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});

export const FoodOrderModel = model("FoodOrder", FoodOrder);
