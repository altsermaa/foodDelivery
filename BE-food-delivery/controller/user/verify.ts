import express, { Request, response, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../model/user.model";

export const verify = async (request: Request, response: Response) => {
  const { token } = request.body;

  const tokenPassword = "foodDelivery";

  try {
    const isValid = jwt.verify(token, tokenPassword);
    if (isValid) {
      const destructedToken = jwt.decode(token);
      // const isAdmin = await UserModel.findById(token.userId)
      response.send(destructedToken);
      return;
    } else {
      response.status(401).send({ message: "token is not valid" });
    }
  } catch (err) {
    response.status(401).send({ message: "token is not valid" });
  }
};
