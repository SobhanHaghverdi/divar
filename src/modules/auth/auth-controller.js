import AuthService from "./auth-service.js";
import AuthMessage from "./auth-messages.js";
import autoBind from "../../common/utils/auto-bind.js";
import NodeEnv from "../../common/constants/env-enum.js";
import CookieName from "../../common/constants/cookie-enum.js";

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
    const accessToken = await this.#service.checkOTP(phoneNumber, code);

    return res
      .cookie(CookieName.AccessToken, accessToken, {
        signed: true,
        httpOnly: true,
        priority: "high",
        maxAge: 2592000000,
        secure: process.env.NODE_ENV === NodeEnv.Production,
      })
      .json({ message: AuthMessage.LoggedInSuccessfully });
  }

  async logOut(req, res) {
    return res
      .clearCookie(CookieName.AccessToken)
      .json({ message: AuthMessage.LoggedOutSuccessfully });
  }
}

export default new AuthController();
