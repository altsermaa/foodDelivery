import express, { Request, response, Response } from "express";
import { UserModel } from "../../model/user.model";
import { sendOTP } from "../../util/sendOTP";
import { OtpModel } from "../../model/otp.model";

export const checkEmail = async (request: Request, response: Response) => {
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
};
