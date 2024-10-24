import Category from "./category-model.js";

class CategoryService {
  #model;

  constructor() {
    this.#model = Category;
  }

  async getAll() {}

  async create(dto) {}
}

export default new CategoryService();
