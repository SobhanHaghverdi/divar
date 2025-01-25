import autoBind from "../../common/utils/auto-bind.js";
import AdvertisementService from "./advertisement-service.js";
import CategoryService from "../category/category-service.js";
import AdvertisementMessage from "./advertisement-message.js";

class AdvertisementController {
  #successMessage;
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

    res.render("./pages/panel/advertisements.ejs", {
      advertisements,
      successMessage: this.#successMessage,
    });

    this.#successMessage = undefined;
  }

  async filter(req, res) {
    const advertisements = await this.#advertisementService.filter(req.query);
    res.locals.layout = "./layouts/website/main.ejs";

    return res.render("./pages/home/index.ejs", { advertisements });
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

  async renderDetailsPage(req, res) {
    const advertisement = await this.#advertisementService.getById(
      req.params.id
    );

    res.locals.layout = "./layouts/website/main.ejs";
    return res.render("./pages/home/advertisement.ejs", { advertisement });
  }

  async create(req, res) {
    req.body.userId = req?.user?._id;
    req.body.imagesName = req?.files?.map((file) => file?.filename);

    await this.#advertisementService.create(req.body);

    this.#successMessage = AdvertisementMessage.Created;
    return res.redirect("/api/advertisements/my");
  }

  async delete(req, res) {
    await this.#advertisementService.delete(req.params.id);

    this.#successMessage = AdvertisementMessage.Deleted;
    return res.redirect("/api/advertisements/my");
  }
}

export default new AdvertisementController();
