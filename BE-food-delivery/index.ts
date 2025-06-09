import express, { Request, Response } from "express";
import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";

const databaseConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://altsermaa:YCQ4jLKHWVnQ2y3z@fooddelivery.dtwtf6a.mongodb.net/FoodDelivery"
    );
  } catch (error) {
    console.log(error);
  }
};

const Users = new Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },

  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel = model("Users", Users);

const app = express();
app.use(express.json());
app.use(cors());

databaseConnect();

app.post("/addUser", async (request: Request, response: Response) => {
  const { email, password } = request.body;
  const result = await UserModel.create({ email, password });

  response.send(result);
});

app.put("/updateUser", async (request: Request, response: Response) => {
  const user = await UserModel.findOneAndUpdate(
    { email: "123@gmail.com" },
    { password: "789" },
    { new: true }
  );
  response.send(user);
});

app.post("/signUp", async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const isEmailExisted = await UserModel.findOne({ email });

  if (!isEmailExisted) {
    const hashedPassword = await bcrypt.hashSync(password, 10);
    await UserModel.create({ email, password: hashedPassword });
    response.send({ message: "Successfully created new user" });
    return;
  }

  response.status(400).send({ message: "User already exists" });
});

app.post("/login", async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const isEmailExisted = await UserModel.findOne({ email });
  if (!isEmailExisted) {
    response.send("User does not exist");
    return;
  } else {
    const hashedPassword = await bcrypt.compareSync(
      password,
      isEmailExisted.password!
    );
    if (hashedPassword) {
      response.send("Successfully logged in");
      console.log(response.send);
      return;
    } else {
      response.send("Wrong password");
    }
  }
});

app.get("/checkEmail", async (request: Request, response: Response) => {
  const { email } = request.body;

  const isEmailExisted = await UserModel.findOne({ email });
  if (!isEmailExisted) {
    response.send("User does not exist");
    return;
  } else {
    response.send("User exists");
    return;
  }
});

app.put("/resetPassword", async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const isEmailExisted = await UserModel.findOne({ email });
  if (!isEmailExisted) {
    response.send("User does not exist");
    return;
  } else {
    const hashedPassword = await bcrypt.hashSync(password, 10);
    await UserModel.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );
    response.send("Reset password successfully");
  }
});

app.get("/", async (request: Request, response: Response) => {
  response.send({ message: "Hello dear" });
});

app.listen(8000, () => {
  console.log("running on http://localhost:8000");
});
