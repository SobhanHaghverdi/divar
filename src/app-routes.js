import { Router } from "express";
import authRouter from "./modules/auth/auth-router.js";
import userRouter from "./modules/user/user-router.js";
import categoryRouter from "./modules/category/category-router.js";
import advertisementOptionRouter from "./modules/advertisement-option/advertisement-option-router.js";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/categories", categoryRouter);
mainRouter.use("/advertisement-options", advertisementOptionRouter);

export default mainRouter;
