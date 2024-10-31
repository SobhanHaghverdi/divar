import autoBind from "../../common/utils/auto-bind.js";
import AdvertisementOption from "./advertisement-option-model.js";

class AdvertisementOptionService {
  #model;

  constructor() {
    autoBind(this);
    this.#model = AdvertisementOption;
  }
}

export default new AdvertisementOptionService();
