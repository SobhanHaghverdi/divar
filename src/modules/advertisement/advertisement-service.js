import Advertisement from "./advertisement-model.js";

class AdvertisementService {
  #model;

  constructor() {
    this.#model = Advertisement;
  }

  async create(dto) {
    const options = { ...dto };

    delete options.lat;
    delete options.lng;
    delete options.city;
    delete options.title;
    delete options.images;
    delete options.province;
    delete options.district;
    delete options.categoryId;
    delete options.description;

    dto.options = options;
    dto.category = dto.categoryId;
    dto.coordinates = [dto.lat, dto.lng];

    return await this.#model.create(dto);
  }
}

export default new AdvertisementService();
