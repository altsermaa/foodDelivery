"use client";

import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import * as Yup from "yup";
import Link from "next/link";
import { useAuth } from "@/app/_component/UserProvider";

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

export const LoginLeft = () => {
  const router = useRouter();
  const { user, tokenChecker } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:8000/login", {
          email: values.email,
          password: values.password,
        });
        localStorage.setItem("token", response.data.token);
        await tokenChecker(response.data.token);
        console.log(response.data.token);
        router.push("/");
      } catch (err: any) {
        alert(err.response.data.message);
      }
    },
  });

  const emailInputProps = {
    name: "email",
    placeholder: "Enter your email",
    value: formik.values.email,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    touched: formik.touched,
    errors: formik.errors,
    handleSubmit: formik.handleSubmit,
  };
  const passwordInputProps = {
    name: "password",
    placeholder: "Password",
    value: formik.values.password,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    touched: formik.touched,
    errors: formik.errors,
    handleSubmit: formik.handleSubmit,
  };

  if (user.userId) {
    router.push("/");
  }

  const isButtonDisabled = !formik.errors.email && formik.values.email;

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
          <h1 className="font-black text-2xl">Log In</h1>
          <h3 className="text-lg ">Log in to enjoy your favorite dishes.</h3>
        </div>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          <div>
            <Input {...emailInputProps} />
            <div className="text-red-500">
              {formik.touched.email && formik.errors.email}
            </div>
          </div>
          <Input {...passwordInputProps} type="password" />
          <div className="text-red-500">
            {formik.touched.password && formik.errors.password}
          </div>
          <Link href="/forgotPassword">
            <p>Forgot password?</p>
          </Link>

          <Button
            variant="secondary"
            type="submit"
            disabled={!isButtonDisabled}
          >
            Let's go
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
