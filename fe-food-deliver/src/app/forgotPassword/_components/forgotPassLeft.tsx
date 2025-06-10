import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import Link from "next/link";

const validationSchema = Yup.object({
  email: Yup.string()
    .required()
    .test(
      "email",
      "Invalid email. Use a format like example@email.com",
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      }
    ),
});
type FormikValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

type Errors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

type TouchedType = {
  email?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
};

export type InputPropsType = {
  values: FormikValues;
  onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (_event: React.FocusEvent<HTMLInputElement>) => void;
  touched: TouchedType;
  stepperBack: () => void;
  stepperNext: () => void;
  errors: Errors;
  handleSubmit: () => void;
};

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

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <Input {...emailInputProps} />
            <div className="text-red-500">{touched.email && errors.email}</div>
          </div>

          <Button
            variant="secondary"
            type="submit"
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
