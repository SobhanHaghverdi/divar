import CategoryService from "./category-service.js";
import CategoryMessage from "./category-messages.js";
import autoBind from "../../common/utils/auto-bind.js";

class CategoryController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = CategoryService;
  }

  async getAll(req, res) {
    const categories = await this.#service.getAll();
    return res.json(categories);
  }

  async create(req, res) {
    await this.#service.create(req.body);

    return res
      .status(201)
      .json({ message: CategoryMessage.CreatedSuccessfully });
  }
}

export default new CategoryController();
