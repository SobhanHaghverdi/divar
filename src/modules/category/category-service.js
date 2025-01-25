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

  async getBySlug(slug) {
    return await this.#model.findOne({ slug }).lean();
  }

  async getAll() {
    return await this.#model.find({ parent: { $exists: false } }).lean();
  }

  async getAllParentsById(id) {
    return await this.#model.find({ parents: id }).lean();
  }

  async getAllWithoutRelation(slug = undefined) {
    let category;
    let result = {};
    const filterMatch = { parent: null };

    if (slug) {
      category = await this.#model
        .findOne({ slug: slug.trim() })
        .select("_id")
        .lean();

      if (!category) {
        return createHttpError.NotFound(CategoryMessage.NotFound);
      }

      result.categories = await this.#model.aggregate([
        { $match: { ...filterMatch, parent: category._id } },
      ]);

      const options = await this.#advertisementOptionService.getAllByCategoryId(
        category._id
      );

      result.options = options.length > 0 ? options : undefined;
    } else {
      result.categories = await this.#model.aggregate([
        { $match: filterMatch },
      ]);
    }

    result.categoryId = category?._id;
    return result;
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
