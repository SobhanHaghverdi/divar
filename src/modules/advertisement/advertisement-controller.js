import autoBind from "../../common/utils/auto-bind.js";
import AdvertisementService from "./advertisement-service.js";

class AdvertisementController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = AdvertisementService;
  }

  async renderCreatePage(req, res) {
    return res.render("./pages/panel/create-advertisement.ejs");
  }
}

export default new AdvertisementController();
