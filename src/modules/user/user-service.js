import User from "./user-model.js";

class UserService {
  #model;

  constructor() {
    this.#model = User;
  }
}

export default new UserService();
