import { randomInt } from "crypto";
import User from "../user/user-model.js";
import createHttpError from "http-errors";
import AuthMessage from "./auth-messages.js";
import autoBind from "../../common/utils/auto-bind.js";

class AuthService {
  #userModel;

  constructor() {
    autoBind(this);
    this.#userModel = User;
  }

  async sendOTP(phoneNumber) {
    const user = await this.#userModel
      .findOne({ phoneNumber })
      .select("otp")
      .lean();

    const otp = {
      code: randomInt(10000, 99999),
      expiresIn: Date.now() + 1000 * 60 * 2,
    };

    if (!user) {
      return await this.#userModel.create({ otp, phoneNumber });
    }

    if (user.otp && user.otp.expiresIn > Date.now()) {
      throw new createHttpError.BadRequest(AuthMessage.OtpNotExpired);
    }

    await this.#userModel.updateOne({ _id: user._id }, { $set: { otp } });
    return user;
  }

  async checkOTP(phoneNumber, code) {}

  async checkExistenceByPhoneNumber(phoneNumber) {
    const user = await this.#userModel.findOne({ phoneNumber }).lean();

    if (!user) throw new createHttpError.NotFound(AuthMessage.UserNotFound);
    return user;
  }
}

export default new AuthService();
