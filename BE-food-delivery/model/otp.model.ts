import mongoose, { Schema, model } from "mongoose";

const Otp = new Schema({
  code: { type: String, required: true },
  userId: { type: Schema.ObjectId, required: true, ref: "Users" },
  createdAt: { type: Date, default: Date.now, expires: 10 },
});

export const OtpModel = model("Otp", Otp);
