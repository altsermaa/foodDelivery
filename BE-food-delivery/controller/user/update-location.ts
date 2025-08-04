import { Request, Response } from "express";
import { UserModel } from "../../model/user.model";

export const updateLocation = async (request: Request, response: Response) => {
  const { id, address } = request.body;

  const isUserExisted = await UserModel.findOne({ _id: id });

  try{
    if (isUserExisted) {
    await UserModel.findByIdAndUpdate(
      id,
      {$set: { address: address, updatedAt: new Date() }},
      { new: true }  
    );
    response.send({ message: "Successfully updated user address" });
    return;
  } else {
     response.status(400).send({ message: "User does not exist" });
  }
  } catch(err) {
    response.status(401).send(err);
  }
  
};
