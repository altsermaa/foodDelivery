import { NextFunction, Request, Response, response } from "express";
import { UserModel, UserRoleEnum } from "../model/user.model";

export const isAdmin = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  const { userId } = response.locals;
  console.log(userId, "userId");

  try {
    const user = await UserModel.findById({ _id: userId });

    if (!user) {
      response.send("User does not exist");
      return;
    }

    if (user.role == UserRoleEnum.ADMIN) {
      next();
      return;
    }

    response.status(401).send("Unauthorized user");
  } catch (err) {
    response.status(401).send({ message: "Error in authorization", err });
  }
};
