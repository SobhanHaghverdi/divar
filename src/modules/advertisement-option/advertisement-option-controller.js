import autoBind from "../../common/utils/auto-bind.js";
import AdvertisementOptionMessage from "./advertisement-option-message.js";
import AdvertisementOptionService from "./advertisement-option-service.js";

class AdvertisementOptionController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = AdvertisementOptionService;
  }

  async get(req, res) {
    const advertisementOption = await this.#service.getById(req.params.id);
    return res.json(advertisementOption);
  }

  async getByCategory(req, res) {
    const advertisementOption = await this.#service.getByCategoryId(
      req.params.categoryId
    );

    return res.json(advertisementOption);
  }

  async getAll(req, res) {
    const advertisementOptions = await this.#service.getAll();
    return res.json(advertisementOptions);
  }

  async create(req, res) {
    await this.#service.create(req.body);

    return res
      .status(201)
      .json({ message: AdvertisementOptionMessage.CreatedSuccessfully });
  }
}

export default new AdvertisementOptionController();
