"use client";

import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { InputPropsType } from "../page";

export const Step2 = ({
  errors,
  values,
  touched,
  stepperNext,
  onChange,
  onBlur,
  stepperBack,
  handleSubmit,
}: InputPropsType) => {
  const passwordInputProps = {
    name: "password",
    placeholder: "Password",
    value: values.password,
    onChange: onChange,
    onBlur: onBlur,
  };

  const confirmPasswordInputProps = {
    name: "confirmPassword",
    placeholder: "Confirm",
    value: values.confirmPassword,
    onChange: onChange,
    onBlur: onBlur,
  };

  const isButtonDisabled = !errors.password;

  const [show, setShow] = useState(false);
  const handleVisibility = () => {
    setShow((prev) => !prev);
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
          <h1 className="font-black text-2xl">Create a strong password</h1>
          <h3 className="text-lg ">
            Create a strong password with letters, numbers.
          </h3>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            {...passwordInputProps}
            type={`${show ? "text" : "password"}`}
          />
          <div className="text-red-500">
            {touched.password && errors.password}
          </div>

          <Input
            {...confirmPasswordInputProps}
            type={`${show ? "text" : "password"}`}
          />
          <div className="text-red-500">
            {touched.confirmPassword && errors.confirmPassword}
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="toggle"
              onCheckedChange={handleVisibility}
              checked={show}
            />
            <Label htmlFor="toggle">Show password</Label>
          </div>

          <Button
            type="submit"
            variant="secondary"
            disabled={!isButtonDisabled}
          >
            Let's go
          </Button>
        </form>
        <div className="flex items-center">
          <p>Already have an account?</p>
          <Button className="text-blue-500" variant="link">
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
};
