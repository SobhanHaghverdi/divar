import UserService from "./user-service.js";
import autoBind from "../../common/utils/auto-bind.js";

class UserController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = UserService;
  }

  async whoami(req, res) {
    const user = req.user;
    return res.json(user);
  }
}

export default new UserController();
