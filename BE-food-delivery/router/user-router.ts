import { signUp } from "../controller/user/sign-up";
import { Router } from "express";
import { tokenChecker } from "../middleware/token-checker";

export const UserRouter = Router();

UserRouter.post("signUp", tokenChecker, signUp);
