import { Router } from "express";
import uploader from "../../common/utils/multer.js";
import AdvertisementController from "./advertisement-controller.js";
import authorization from "../../common/guard/authorization-guard.js";

const advertisementRouter = Router({ caseSensitive: true });

advertisementRouter.get(
  "/create",
  authorization,
  AdvertisementController.renderCreatePage
);

advertisementRouter.get(
  "/my",
  authorization,
  AdvertisementController.getMyAdvertisements
);

advertisementRouter.post(
  "/create",
  authorization,
  uploader.array("images", 10),
  AdvertisementController.create
);

advertisementRouter.delete(
  "/:id",
  authorization,
  AdvertisementController.delete
);

export default advertisementRouter;
