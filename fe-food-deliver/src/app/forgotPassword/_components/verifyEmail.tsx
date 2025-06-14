import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputPropsType } from "../page";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import axios from "axios";

export const VerifyEmail = ({ stepperBack, stepperNext }: InputPropsType) => {
  const [error, setError] = useState<string>("");
  const [values, setValues] = useState<string>("");

  const sendOtp = async (values: string) => {
    try {
      console.log('hi')
      const response = await axios.post("http://localhost:8000/checkOtp", {
        code: values,
      });
      console.log(response);
      if (response.data === "wrong code") {
        setError(response.data);
        return;
      } else {
        stepperNext();
      }
    } catch (err: any) {
      console.log(err);
      alert(err);
    }
  };

  return (
    <div className="flex-1/3 items-center">
      <div className="w-[416px] m-auto flex gap-6 flex-col">
        <Button
          variant="secondary"
          size="icon"
          className="size-8 bg-white border border-gray-100"
          onClick={stepperBack}
        >
          <ChevronLeftIcon />
        </Button>
        <div>
          <h1 className="font-black text-2xl">Please verify Your Email</h1>
          <h3 className="text-lg ">
            We just sent an email to Test@gmail.com. Click the link in the email
            to verify your account.
          </h3>
          <InputOTP
            maxLength={4}
            className="flex justify-center"
            value={values}
            onChange={(values) => setValues(values)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          <div className="text-red-500">{error}</div>
          <div className="flex gap-5">
            <Button className="bg-lime-500" onClick={() => sendOtp(values)}>
              Confirm OTP
            </Button>
            <Button>Resend email</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
