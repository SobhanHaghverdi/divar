import autoBind from "../../common/utils/auto-bind.js";
import AdvertisementService from "./advertisement-service.js";
import CategoryService from "../category/category-service.js";
import AdvertisementMessage from "./advertisement-message.js";

class AdvertisementController {
  #categoryService;
  #advertisementService;

  constructor() {
    autoBind(this);

    this.#categoryService = CategoryService;
    this.#advertisementService = AdvertisementService;
  }

  async getMyAdvertisements(req, res) {
    const advertisements = await this.#advertisementService.getAllByUserId(
      req?.user?._id
    );

    return res.render("./pages/panel/advertisements.ejs", { advertisements });
  }

  async renderCreatePage(req, res) {
    const { slug } = req.query;

    const { categories, options, categoryId } =
      await this.#categoryService.getAllWithoutRelation(slug);

    return res.render("./pages/panel/create-advertisement.ejs", {
      options,
      categories,
      categoryId,
      showBackButton: slug ? true : false,
    });
  }

  async create(req, res) {
    req.body.userId = req?.user?._id;
    req.body.imagesName = req?.files?.map((file) => file?.filename);

    await this.#advertisementService.create(req.body);
    return res.status(201).json({ message: AdvertisementMessage.Created });
  }
}

export default new AdvertisementController();
