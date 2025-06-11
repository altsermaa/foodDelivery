"use client";

import { Step1 } from "./_components/Step1";
import { RightSide } from "./_components/Right";
import { Step2 } from "./_components/Step2";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import axios from "axios";
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
  password: Yup.string()
    .required()
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords must match"),
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

const SignUpPage = () => {
  const router = useRouter();
  const { user, tokenChecker } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:8000/signUp", {
          email: values.email,
          password: values.password,
        });
        router.push("/login");
      } catch (err: any) {
        alert(err.response.data.message);
      }
    },
  });

  const comp = [Step1, Step2];
  const [index, setIndex] = useState<number>(0);

  const stepperNext = () => {
    index !== 1 && setIndex((prev) => prev + 1);
  };

  const stepperBack = () => {
    index !== 0 && setIndex((prev) => prev - 1);
  };

  const Stepper = comp[index];

  const inputProps = {
    values: formik.values,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    touched: formik.touched,
    errors: formik.errors,
    stepperBack: stepperBack,
    stepperNext: stepperNext,
    handleSubmit: formik.handleSubmit,
  };

  if (user.userId) {
    router.push("/");
  }

  return (
    <div className="flex items-center justify-center h-screen p-5">
      <div className="flex-1/5">
        <Stepper {...inputProps} />
      </div>

      <div className="flex-2/5 h-full">
        <RightSide />
      </div>
    </div>
  );
};

export default SignUpPage;
