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
    return res.json({ message: AuthMessage.OtpSentSuccessfully });
  }

  async checkOTP(req, res) {
    const { phoneNumber, code } = req.body;

    await this.#service.checkOTP(phoneNumber, code);
    return res.json({ message: AuthMessage.LoggedInSuccessfully });
  }

  async logout(req, res) {}
}

export default new AuthController();
