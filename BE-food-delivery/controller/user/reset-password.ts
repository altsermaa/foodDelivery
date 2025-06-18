import express, { Request, response, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../../model/user.model";

export const resetPassword = async (request: Request, response: Response) => {
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
};
