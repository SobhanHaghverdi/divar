import utf8 from "utf8";
import axios from "axios";
import Advertisement from "./advertisement-model.js";
import { removeProperties } from "../../common/utils/object-helper.js";
import createHttpError from "http-errors";
import AdvertisementMessage from "./advertisement-message.js";
import CategoryService from "../category/category-service.js";

class AdvertisementService {
  #model;
  #categoryService;

  constructor() {
    this.#model = Advertisement;
    this.#categoryService = CategoryService;
  }

  async getById(id) {
    const advertisement = await this.#model
      .findById(id)
      .lean()
      .populate("userId", "phoneNumber");

    if (advertisement) {
      advertisement.userPhoneNumber = advertisement?.userId?.phoneNumber;
    }

    return advertisement;
  }

  async filter(options) {
    const query = {};
    let { slug, search } = options;

    if (slug) {
      const category = await this.#categoryService.getBySlug(slug);
      let parentCategories = await this.#categoryService.getAllParentsById(
        category._id
      );

      parentCategories = parentCategories.map((pc) => pc._id);
      query.category = { $in: [category._id, ...parentCategories] };
    }

    if (search) {
      search = new RegExp(search, "ig");
      query.$or = [{ title: search }, { description: search }];
    }

    return await this.#model.find(query).sort("createdAt").lean();
  }

  async getAllByUserId(userId) {
    return await this.#model.find({ userId }).lean();
  }

  async create(dto) {
    const options = { ...dto };

    removeProperties(options, [
      "lat",
      "lng",
      "city",
      "title",
      "userId",
      "amount",
      "province",
      "district",
      "imagesName",
      "categoryId",
      "description",
    ]);

    for (let key in options) {
      const value = options[key];
      delete options[key];

      key = utf8.decode(key);
      options[key] = value;
    }

    const { data } = await axios.get(
      `https://api.neshan.org/v5/reverse?lat=${dto.lat}&lng=${dto.lng}`,
      { headers: { "Api-Key": process.env.NESHAN_API_KEY } }
    );

    dto.city = data.city;
    dto.options = options;
    dto.province = data.state;
    dto.district = data.district;
    dto.category = dto.categoryId;
    dto.address = data.formatted_address;
    dto.coordinates = [dto.lat, dto.lng];

    return await this.#model.create(dto);
  }

  async delete(id) {
    const advertisement = await this.#model.findByIdAndDelete(id);

    if (!advertisement) {
      throw new createHttpError.NotFound(AdvertisementMessage.NotFound);
    }
  }
}

export default new AdvertisementService();
