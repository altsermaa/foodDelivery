import express, { Request, response, Response } from "express";
import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());
app.use(cors());

const databaseConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://altsermaa:YCQ4jLKHWVnQ2y3z@fooddelivery.dtwtf6a.mongodb.net/FoodDelivery"
    );
  } catch (error) {
    console.log(error);
  }
};

enum UserRoleEnum {
  USER,
  ADMIN,
}

const Users = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ["USER", "ADMIN"], required: true },
  // orderedFoods: [{ type: Schema.ObjectId, required: true, ref: "Foods" }],
  isVerified: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});

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

const Foods = new Schema({
  foodName: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  ingredients: { type: String, required: true },
  categoryName: { type: Schema.ObjectId, required: true, ref: "FoodCategory" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const FoodCategory = new Schema({
  categoryName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Otp = new Schema({
  code: { type: String, required: true },
  userId: { type: Schema.ObjectId, required: true, ref: "Users" },
  createdAt: { type: Date, default: Date.now, expires: 10 },
});

const UserModel = model("Users", Users);
const OtpModel = model("Otp", Otp);
const FoodCategoryModel = model("FoodCategory", FoodCategory);
const FoodsModel = model("Foods", Foods);
const FoodOrderModel = model("FoodOrder", FoodOrder);

databaseConnect();

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

    const tokenPassword = "foodDelivery";
    if (hashedPassword) {
      const token = jwt.sign({ userId: isEmailExisted._id }, tokenPassword);
      response.send({ message: "Successfully logged in", token: token });
      return;
    } else {
      response.send("Wrong password");
    }
  }
});

app.post("/verify", async (request: Request, response: Response) => {
  const { token } = request.body;

  const tokenPassword = "foodDelivery";

  try {
    const isValid = jwt.verify(token, tokenPassword);
    if (isValid) {
      const destructedToken = jwt.decode(token);
      response.send(destructedToken);
      return;
    } else {
      response.status(401).send({ message: "token is not valid" });
    }
  } catch (err) {
    response.status(401).send({ message: "token is not valid" });
  }
});

function generateRandom4DigitNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}

const sendOTP = async (email: string) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "altsermaa@gmail.com",
      pass: "wexbhtfemzxqfwss",
    },
  });

  let randomNumber = generateRandom4DigitNumber();

  const options = {
    from: "altsermaa@gmail.com",
    to: [email],
    subject: "hello",
    text: `Your verification number is: ${randomNumber}`,
  };

  await transport.sendMail(options);
  return randomNumber;
};

app.put("/checkEmail", async (request: Request, response: Response) => {
  const { email } = request.body;
  console.log(email);

  try {
    const isEmailExisted = await UserModel.findOne({ email });
    if (!isEmailExisted) {
      response.send("User does not exist");
      return;
    } else {
      const otp = await sendOTP(email);
      await OtpModel.create({ code: otp, userID: isEmailExisted._id });
      response.send("success");
    }
  } catch (err) {
    response.status(500).send(err);
    console.log(err);
    return;
  }
});

app.post("/checkOtp", async (request: Request, response: Response) => {
  const { email, code } = request.body;

  try {
    const isOtpExisting = await OtpModel.findOne({ code }).populate("userId");
    console.log("this is checking if otp exists", isOtpExisting);

    if (!isOtpExisting) {
      response.status(400).send("wrong code");
      return;
    } else {
      response.status(200).send({ message: "otp matched", isOtpExisting });
    }
  } catch (err) {
    response.status(400).send("aldaa");
  }
});

app.put("/resetPassword", async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const isEmailExisted = await UserModel.findOne({ email });
    if (isEmailExisted) {
      const hashedPassword = await bcrypt.hashSync(password, 10);

      await UserModel.findOneAndUpdate({ email }, { password: hashedPassword });
      response.status(200).send("Reset password successfully");
      console.log(response);
    }
  } catch (err) {
    response.status(400).send({ message: "aldaa", err });
  }
});

app.post("/createFood", async (request: Request, response: Response) => {
  const { foodName, price, image, ingredients, categoryName } = request.body;

  try {
    const isFoodExisted = await FoodsModel.findOne({ foodName });
    const isCategoryExisted = await FoodCategoryModel.findOne({ categoryName });

    if (!isFoodExisted && isCategoryExisted) {
      await FoodsModel.create({
        foodName,
        price,
        image,
        ingredients,
        categoryName: isCategoryExisted?._id,
      });
      response.send({ message: "Successfully created new food" });
      return;
    }

    response.status(400).send({ message: "This food already exists" });
  } catch (err) {
    response.send(err);
  }
});

app.post("/createCategory", async (request: Request, response: Response) => {
  const { categoryName } = request.body;
  try {
    const isCategoryExisted = await FoodCategoryModel.findOne({ categoryName });

    if (!isCategoryExisted) {
      await FoodCategoryModel.create({ categoryName });
      response.send({ message: "Successfully created category" });
      return;
    }
    response.status(400).send({ message: "This category already exists" });
  } catch (err) {
    response.send(err);
  }
});

app.get("/readyFoods", async (request: Request, response: Response) => {
  try {
    const readyFoods = await FoodsModel.find({});
    response.send(readyFoods);
    console.log(readyFoods);
  } catch (err) {
    response.send(err);
  }
});

app.listen(8000, () => {
  console.log("running on http://localhost:8000");
});
