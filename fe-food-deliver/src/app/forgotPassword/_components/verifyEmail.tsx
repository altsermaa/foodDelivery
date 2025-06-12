import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const VerifyEmail = () => {
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
          <h1 className="font-black text-2xl">Please verify Your Email</h1>
          <h3 className="text-lg ">
            We just sent an email to Test@gmail.com. Click the link in the email
            to verify your account.
          </h3>
        </div>

        {/* <form className="flex flex-col gap-6">
          <div>
            <Input {...emailInputProps} />
            <div className="text-red-500">
              {formik.touched.email && formik.errors.email}
            </div>
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
          </Link> */}
      </div>
    </div>
    // </div>
  );
};
