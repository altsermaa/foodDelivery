import express from "express";
import mongoose, { Schema, model } from "mongoose";
import cors from "cors";
import { UserRouter } from "./router/user-router";
import { FoodRouter } from "./router/food-router";
import { OrderRouter } from "./router/order-router";
import { AdminRouter } from "./router/admin-router";

const app = express();
app.use(express.json());
app.use(cors());

const databaseConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://altsermaa:jVpSAMyAqSH82mV8@fooddelivery.dtwtf6a.mongodb.net/FoodDelivery"
    );
  } catch (error) {
    console.log(error);
  }
};

databaseConnect();

app.use(UserRouter);
app.use(FoodRouter);
app.use(OrderRouter);
app.use(AdminRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
