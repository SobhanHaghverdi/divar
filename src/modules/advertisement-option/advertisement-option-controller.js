import autoBind from "../../common/utils/auto-bind.js";
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

  async create(req, res) {}
}

export default new AdvertisementOptionController();
