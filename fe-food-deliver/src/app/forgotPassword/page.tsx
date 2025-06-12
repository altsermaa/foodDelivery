"use client";

import { useState } from "react";
import { RightSide } from "../signUp/_components/Right";
import { ForgotPassLeft } from "./_components/forgotPassLeft";
import { VerifyEmail } from "./_components/verifyEmail";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

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

const ForgotPasswordPage = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
       
      } catch (err: any) {
        alert(err.response.data.message);
      }
    },
  });

  const comp = [ForgotPassLeft, VerifyEmail];
  const [index, setIndex] = useState<number>(0);

  const Stepper = comp[index];

  const stepperNext = () => {
    index < 2 && setIndex((prev) => prev + 1);
  };

  const stepperBack = () => {
    setIndex((prev) => prev - 1);
  };

  const emailInputProps = {
    values: formik.values,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    touched: formik.touched,
    errors: formik.errors,
    handleSubmit: formik.handleSubmit,
    stepperBack: stepperBack,
    stepperNext: stepperNext,
  };

  return (
    <div className="flex items-center justify-center h-screen p-5">
      <div className="flex-1/5">
        <Stepper {...emailInputProps} />
      </div>
      <div className="flex-2/5 h-full">
        <RightSide />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
