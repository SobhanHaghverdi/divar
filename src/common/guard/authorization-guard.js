import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import User from "../../modules/user/user-model.js";
import CookieName from "../constants/cookie-enum.js";
import AuthorizationMessage from "../messages/auth-messages.js";

const authorize = async (req, res, next) => {
  try {
    const token = req?.signedCookies[CookieName.AccessToken];

    if (!token) {
      throw new createHttpError.Unauthorized(AuthorizationMessage.Login);
    }

    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (data?.id) {
      const user = await User.findById(data?.id, {
        otp: 0,
        __v: 0,
        updatedAt: 0,
        isPhoneNumberVerified: 0,
      }).lean();

      if (!user) {
        throw new createHttpError.Unauthorized(
          AuthorizationMessage.AccountNotFound
        );
      }

      req.user = user;
      return next();
    }

    throw new createHttpError.Unauthorized(AuthorizationMessage.TokenInvalid);
  } catch (error) {
    next(error);
  }
};

export default authorize;
