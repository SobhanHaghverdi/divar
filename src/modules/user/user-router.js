import { Router } from "express";
import UserController from "./user-controller.js";
import authorize from "../../common/guard/authorization-guard.js";

const userRouter = Router({ caseSensitive: true });

userRouter.get("/whoami", authorize, UserController.whoami);

export default userRouter;
