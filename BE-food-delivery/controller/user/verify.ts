import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../model/user.model";

export const verify = async (request: Request, response: Response) => {
  const { token } = request.body;

  const tokenPassword = "foodDelivery";

  try {
    const isValid = jwt.verify(token, tokenPassword);
    if (isValid) {
      const destructedToken = jwt.decode(token) as any;
      console.log("Decoded token:", destructedToken);
      console.log("userId type:", typeof destructedToken.userId);
      console.log("userId value:", destructedToken.userId);
      
      const user = await UserModel.findById(destructedToken.userId);
      console.log("User from database:", user);
      
      if (user) {
        const responseData = {
          userId: user._id,
          isAdmin: user.role === "ADMIN",
          email: user.email
        };
        console.log("Sending response:", responseData);
        response.send(responseData);
      } else {
        console.log("User not found in database, sending decoded token");
        response.send(destructedToken);
      }
      return;
    } else {
      response.status(401).send({ message: "token is not valid" });
    }
  } catch (err) {
    console.log("Error in verify:", err);
    response.status(401).send({ message: "token is not valid" });
  }
};
