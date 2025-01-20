import { Router } from "express";
import uploader from "../../common/utils/multer.js";
import AdvertisementController from "./advertisement-controller.js";

const advertisementRouter = Router({ caseSensitive: true });

advertisementRouter.get("/create", AdvertisementController.renderCreatePage);
advertisementRouter.get("/", AdvertisementController.getAll);

advertisementRouter.post(
  "/create",
  uploader.array("images", 10),
  AdvertisementController.create
);

export default advertisementRouter;
