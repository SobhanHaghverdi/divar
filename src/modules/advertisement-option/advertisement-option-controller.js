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

  async getAllByCategorySlug(req, res) {
    const advertisementOptions = await this.#service.getAllByCategorySlug(
      req.params.slug
    );

    return res.json(advertisementOptions);
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

  async update(req, res) {
    await this.#service.update(req.params.id, req.body);

    return res.json({
      message: AdvertisementOptionMessage.UpdatedSuccessfully,
    });
  }

  async delete(req, res) {
    await this.#service.deleteById(req.params.id);

    return res.json({
      message: AdvertisementOptionMessage.DeletedSuccessfully,
    });
  }
}

export default new AdvertisementOptionController();
