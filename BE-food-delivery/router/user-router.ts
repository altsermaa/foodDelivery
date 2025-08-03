import { signUp } from "../controller/user/sign-up";
import { Router } from "express";
import { login } from "../controller/user/login";
import { verify } from "../controller/user/verify";
import { checkEmail } from "../controller/user/check-email";
import { checkOtp } from "../controller/user/check-OTP";
import { resetPassword } from "../controller/user/reset-password";
import { updateLocation } from "../controller/user/update-location";
import { tokenChecker } from "../middleware/token-checker";

export const UserRouter = Router();

UserRouter.post("/signUp", signUp);
UserRouter.post("/login", login);
UserRouter.post("/verify", verify);
UserRouter.put("/checkEmail", checkEmail);
UserRouter.post("/checkOtp", checkOtp);
UserRouter.put("/resetPassword", resetPassword);
UserRouter.put("/updateAddress",  tokenChecker, updateLocation);
