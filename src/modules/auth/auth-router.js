import { Router } from "express";
import AuthController from "./auth-controller.js";

const authRouter = Router({ caseSensitive: true });

authRouter.post("/send-otp", AuthController.sendOTP);
authRouter.post("/check-otp", AuthController.checkOTP);

export default authRouter;
