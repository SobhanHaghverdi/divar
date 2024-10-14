import { Router } from "express";
import AuthController from "./AuthController.js";

const router = Router({ caseSensitive: true });

router.post("/send-otp", AuthController.sendOTP);
router.post("/check-otp", AuthController.checkOTP);

export { router as authRouter };
