import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import Link from "next/link";
import { InputPropsType } from "../page";
import { useState } from "react";

export const ForgotPassLeft = ({
  errors,
  values,
  touched,
  stepperNext,
  onChange,
  onBlur,
  handleSubmit,
}: InputPropsType) => {
  const emailInputProps = {
    name: "email",
    placeholder: "Enter your email",
    value: values.email,
    onChange: onChange,
    onBlur: onBlur,
  };

  const isButtonDisabled = !errors.email && values.email;
  const [error, setError] = useState<string>("");

  const checkEmail = async () => {
    try {
      const response = await axios.put(
        "https://fooddelivery-q3yg.onrender.com/checkEmail",
        {
          email: values.email,
        }
      );
      console.log(response);
      if (response.data === "User does not exist") {
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
        >
          <ChevronLeftIcon />
        </Button>
        <div>
          <h1 className="font-black text-2xl">Reset your password</h1>
          <h3 className="text-lg ">
            Enter your email to receive a password reset link.
          </h3>
        </div>

        <form className="flex flex-col gap-6">
          <div>
            <Input {...emailInputProps} />
            <div className="text-red-500">{touched.email && error}</div>
          </div>

          <Button
            variant="secondary"
            type="button"
            onClick={checkEmail}
            disabled={!isButtonDisabled}
          >
            Send link
          </Button>
        </form>
        <div className="flex items-center">
          <p>Don't have an account?</p>

          <Link href="/signUp">
            <Button className="text-blue-500" variant="link">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
