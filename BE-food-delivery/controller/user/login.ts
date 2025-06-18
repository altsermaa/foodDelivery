import { Request, Response } from "express";
import { UserModel } from "../../model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (request: Request, response: Response) => {
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
};
