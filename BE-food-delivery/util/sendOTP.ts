import nodemailer from "nodemailer";
import { randomNumberGenerator } from "./randomNumbeGenerator";

export const sendOTP = async (email: string) => {
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

  let randomNumber = randomNumberGenerator();

  const options = {
    from: "altsermaa@gmail.com",
    to: [email],
    subject: "hello",
    text: `Your verification number is: ${randomNumber}`,
  };

  await transport.sendMail(options);
  return randomNumber;
};
