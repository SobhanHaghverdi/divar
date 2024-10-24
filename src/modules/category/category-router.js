import { Router } from "express";
import CategoryController from "./category-controller.js";
import authorize from "../../common/guard/authorization-guard.js";

const categoryRouter = Router({ caseSensitive: true });

categoryRouter.post("/", authorize, CategoryController.create);

export default categoryRouter;
