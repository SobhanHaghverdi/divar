import slugify from "slugify";
import { Types } from "mongoose";
import createHttpError from "http-errors";
import Category from "./category-model.js";
import CategoryMessage from "./category-messages.js";
import AdvertisementOptionService from "../advertisement-option/advertisement-option-service.js";

class CategoryService {
  #model;
  #advertisementOptionService;

  constructor() {
    this.#model = Category;
    this.#advertisementOptionService = AdvertisementOptionService;
  }

  async getAll() {
    return await this.#model.find({ parent: { $exists: false } }).lean();
  }

  async checkExistenceById(id) {
    const category = await this.#model.findById(id).lean();

    if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);
    return category;
  }

  async checkExistenceBySlug(slug) {
    const category = await this.#model.findOne({ slug }).lean();

    if (category) {
      throw new createHttpError.Conflict(CategoryMessage.SlugAlreadyExists);
    }

    return undefined;
  }

  async create(dto) {
    const { parent, slug } = dto;

    if (parent) {
      const parentCategory = await this.checkExistenceById(parent);

      const parents = [parentCategory?._id.toString()];

      if (parentCategory?.parents && parentCategory?.parents.length > 0) {
        parents.push(...parentCategory.parents.map((id) => id.toString()));
      }

      dto.parent = parentCategory._id;
      dto.parents = [...new Set(parents.map((id) => new Types.ObjectId(id)))];
    }

    if (slug) {
      dto.slug = slugify(slug);
    } else {
      dto.slug = slugify(dto.name);
    }

    await this.checkExistenceBySlug(dto.slug);

    const category = await this.#model.create(dto);
    return category;
  }

  async deleteById(id) {
    const result = await this.#model.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw createHttpError.NotFound(CategoryMessage.NotFound);
    }

    await this.#advertisementOptionService.deleteAllByCategoryId(id);
  }
}

export default new CategoryService();
