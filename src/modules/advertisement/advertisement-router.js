import { Router } from "express";
import AdvertisementController from "./advertisement-controller.js";

const advertisementRouter = Router({ caseSensitive: true });

advertisementRouter.get("/create", AdvertisementController.renderCreatePage);

export default advertisementRouter;
