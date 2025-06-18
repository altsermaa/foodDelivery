import express, { Request, response, Response } from "express";
import { OtpModel } from "../../model/otp.model";

export const checkOtp = async (request: Request, response: Response) => {
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
};
