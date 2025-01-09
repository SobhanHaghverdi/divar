import autoBind from "../../common/utils/auto-bind.js";
import AdvertisementService from "./advertisement-service.js";
import CategoryService from "../category/category-service.js";

class AdvertisementController {
  #categoryService;
  #advertisementService;

  constructor() {
    autoBind(this);

    this.#categoryService = CategoryService;
    this.#advertisementService = AdvertisementService;
  }

  async renderCreatePage(req, res) {
    const { slug } = req.query;
    const categories = await this.#categoryService.getAllWithoutRelation(slug);

    return res.render("./pages/panel/create-advertisement.ejs", {
      categories,
      showBackButton: slug ? true : false,
    });
  }
}

export default new AdvertisementController();
