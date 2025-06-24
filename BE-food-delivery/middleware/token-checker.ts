import express, { NextFunction, Request, response, Response } from "express";
import jwt from "jsonwebtoken";

export const tokenChecker = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const auth = request.headers.authorization;
  if (!auth) {
    response.status(401).send({ message: "token is not valid" });
    return;
  }
  const token = auth.split(" ")[1];

  const tokenPassword = "foodDelivery";

  try {
    const isValid = jwt.verify(token, tokenPassword);

    if (isValid) {
      const destructToken: any = jwt.decode(token);
      response.locals.userId = destructToken.userId;
      console.log(destructToken.userId);
      next();
      return;
    } else {
      response.status(401).send({ message: "token is not valid" });
    }
  } catch (err) {
    response.status(401).send({ message: "token is not valid" });
  }
};
