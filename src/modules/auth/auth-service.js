import jwt from "jsonwebtoken";
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

  async checkOTP(phoneNumber, code) {
    const user = await this.checkExistenceByPhoneNumber(phoneNumber);

    if (user?.otp?.expiresIn <= Date.now()) {
      throw new createHttpError.Unauthorized(AuthMessage.OtpExpired);
    }

    if (user?.otp?.code !== code) {
      throw new createHttpError.Unauthorized(AuthMessage.OtpIncorrect);
    }

    if (!user.isPhoneNumberVerified) {
      user.isPhoneNumberVerified = true;
    }

    await this.#userModel.updateOne(
      { _id: user._id },
      { $set: { isPhoneNumberVerified: user.isPhoneNumberVerified } }
    );

    return this.#signToken({ phoneNumber, id: user._id });
  }

  async checkExistenceByPhoneNumber(phoneNumber) {
    const user = await this.#userModel.findOne({ phoneNumber }).lean();

    if (!user) throw new createHttpError.NotFound(AuthMessage.UserNotFound);
    return user;
  }

  #signToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
      algorithm: "HS512",
    });
  }
}

export default new AuthService();
