import autoBind from "../../common/utils/auto-bind.js";
import AdvertisementOptionMessage from "./advertisement-option-message.js";
import AdvertisementOptionService from "./advertisement-option-service.js";

class AdvertisementOptionController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = AdvertisementOptionService;
  }

  async get(req, res) {}

  async getAll(req, res) {}

  async getByCategory(req, res) {}

  async create(req, res) {
    await this.#service.create(req.body);

    return res
      .status(201)
      .json({ message: AdvertisementOptionMessage.CreatedSuccessfully });
  }
}

export default new AdvertisementOptionController();
