import AuthService from "./auth-service.js";
import AuthMessage from "./auth-messages.js";
import autoBind from "../../common/utils/auto-bind.js";

class AuthController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = AuthService;
  }

  async sendOTP(req, res) {
    await this.#service.sendOTP(req.body.phoneNumber);
    return { message: AuthMessage.OtpSentSuccessfully };
  }

  async checkOTP(req, res) {}

  async logout(req, res) {}
}

export default new AuthController();
