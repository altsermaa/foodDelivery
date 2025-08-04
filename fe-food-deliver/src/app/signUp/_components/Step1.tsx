"use client";

import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputPropsType } from "../page";
import Link from "next/link";

export const Step1 = ({
  errors,
  values,
  touched,
  stepperNext,
  onChange,
  onBlur,
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
          <h1 className="font-black text-2xl">Create your account</h1>
          <h3 className="text-lg ">Sign up to explore your favoirite dishes</h3>
        </div>

        <form onSubmit={stepperNext} className="flex flex-col gap-6">
          <div>
            <Input {...emailInputProps} />
            <div className="text-red-500">{touched.email && errors.email}</div>
          </div>

          <Button
            variant="secondary"
            type="submit"
            disabled={!isButtonDisabled}
          >
            Let's go
          </Button>
        </form>
        <div className="flex items-center">
          <p>Already have an account?</p>
          <Link href="/login">
            <Button className="text-blue-500" variant="link">
              Log in
            </Button>
          </Link>

        </div>
      </div>
    </div>
  );
};
