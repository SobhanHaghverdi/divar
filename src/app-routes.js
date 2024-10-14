import { Router } from "express";
import authRouter from "./modules/auth/auth-router.js";

const mainRouter = Router({ caseSensitive: true });

mainRouter.use("/auth", authRouter);

export default mainRouter;
