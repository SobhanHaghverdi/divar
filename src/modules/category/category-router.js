import { Router } from "express";
import CategoryController from "./category-controller.js";
import authorize from "../../common/guard/authorization-guard.js";

const categoryRouter = Router({ caseSensitive: true });

categoryRouter.get("/", CategoryController.getAll);
categoryRouter.post("/", authorize, CategoryController.create);
categoryRouter.delete("/:id", authorize, CategoryController.delete);

export default categoryRouter;
