import slugify from "slugify";
import createHttpError from "http-errors";
import autoBind from "../../common/utils/auto-bind.js";
import AdvertisementOption from "./advertisement-option-model.js";
import AdvertisementOptionMessage from "./advertisement-option-message.js";

class AdvertisementOptionService {
  #model;

  constructor() {
    autoBind(this);
    this.#model = AdvertisementOption;
  }

  async create(dto) {
    const { key, category, enum: enumList = undefined } = dto;

    const existingCategory = await this.#model
      .findById(category)
      .select("_id")
      .lean();

    if (existingCategory) {
      throw new createHttpError.Conflict(
        AdvertisementOptionMessage.CategoryAlreadyExists
      );
    }

    dto.key = slugify(key, {
      trim: true,
      lower: true,
      replacement: "_",
    });

    const existingKey = await this.#model
      .findOne({ key, category })
      .select("_id")
      .lean();

    if (existingKey) {
      throw new createHttpError.Conflict(
        AdvertisementOptionMessage.CategoryKeyAlreadyExists
      );
    }

    if (enumList && typeof enumList === "string") {
      dto.enum = enumList.split(",");
    }

    return await this.#model.create(dto);
  }
}

export default new AdvertisementOptionService();
