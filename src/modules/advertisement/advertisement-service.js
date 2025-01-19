import axios from "axios";
import Advertisement from "./advertisement-model.js";
import { removeProperties } from "../../common/utils/object-helper.js";

class AdvertisementService {
  #model;

  constructor() {
    this.#model = Advertisement;
  }

  async create(dto) {
    const options = { ...dto };

    removeProperties(options, [
      "lat",
      "lng",
      "city",
      "title",
      "images",
      "province",
      "district",
      "categoryId",
      "description",
    ]);

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
}

export default new AdvertisementService();
