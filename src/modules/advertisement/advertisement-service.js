import Advertisement from "./advertisement-model.js";

class AdvertisementService {
  #model;

  constructor() {
    this.#model = Advertisement;
  }
}

export default new AdvertisementService();
