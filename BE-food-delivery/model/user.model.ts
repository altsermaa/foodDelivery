import mongoose, { Schema, model } from "mongoose";

enum UserRoleEnum {
  ADMIN = "ADMIN",
  USER = "USER",
}
export type User = {
  email: string;
  password: string;
  isVerified?: boolean;
  phoneNumber?: number;
  address: string;
  role: UserRoleEnum;
};

const Users = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, required: false },
  address: { type: String, required: false },
  role: { type: String, enum: ["USER", "ADMIN"], required: false },
  // orderedFoods: [{ type: Schema.ObjectId, required: true, ref: "Foods" }],
  isVerified: { type: Boolean, required: false },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});

Users.index({ email: 1 }, { unique: true });

export const UserModel = model("Users", Users);
