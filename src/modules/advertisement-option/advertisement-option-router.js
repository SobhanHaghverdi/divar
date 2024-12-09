import { Router } from "express";
import authorize from "../../common/guard/authorization-guard.js";
import AdvertisementOptionController from "./advertisement-option-controller.js";

const advertisementOptionRouter = Router({ caseSensitive: true });

advertisementOptionRouter.get("/", AdvertisementOptionController.getAll);
advertisementOptionRouter.get("/:id", AdvertisementOptionController.get);

advertisementOptionRouter.get(
  "/category/:categoryId",
  AdvertisementOptionController.getByCategory
);

advertisementOptionRouter.get(
  "/category-slug/:slug",
  AdvertisementOptionController.getAllByCategorySlug
);

advertisementOptionRouter.post(
  "/",
  authorize,
  AdvertisementOptionController.create
);

advertisementOptionRouter.patch(
  "/:id",
  authorize,
  AdvertisementOptionController.update
);

advertisementOptionRouter.delete(
  "/:id",
  authorize,
  AdvertisementOptionController.delete
);

export default advertisementOptionRouter;
