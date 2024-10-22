import { Router } from "express";
import authRouter from "./modules/auth/auth-router.js";
import userRouter from "./modules/user/user-router.js";

const mainRouter = Router({ caseSensitive: true });

mainRouter.use("/auth", authRouter);
mainRouter.use("/users", userRouter);

export default mainRouter;
