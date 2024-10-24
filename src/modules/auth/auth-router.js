import { Router } from "express";
import AuthController from "./auth-controller.js";
import authorize from "../../common/guard/authorization-guard.js";

const authRouter = Router({ caseSensitive: true });

authRouter.post("/send-otp", AuthController.sendOTP);
authRouter.post("/check-otp", AuthController.checkOTP);
authRouter.get("/log-out", authorize, AuthController.logOut);

export default authRouter;
