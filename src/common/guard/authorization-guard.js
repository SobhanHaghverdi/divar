import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import AuthorizationMessage from "../messages/auth-messages.js";
import User from "../../modules/user/user-model.js";

const authorize = async (req, res, next) => {
  try {
    const token = req?.signedCookies?.access_token;

    if (!token) {
      throw new createHttpError.Unauthorized(AuthorizationMessage.Login);
    }

    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (data?.id) {
      const user = await User.findById(data?.id, { otp: 0 }).lean();

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
