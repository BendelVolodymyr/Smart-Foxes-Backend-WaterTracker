import dotenv from "dotenv";
dotenv.config();

import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userModels.js";
const { SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw HttpError(401, "Not authorized");
    }

    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw HttpError(401, "Not authorized");
    }

    jwt.verify(token, SECRET_KEY, (error, decode) => {
      if (error) {
        if (error.name === "TokenExpiredError") {
          throw HttpError(401, "Token expired");
        }
        throw HttpError(401, "Not authorized");
      }
      req.user = {
        id: decode.id,
      };
    });

    const user = await User.findById(req.user.id);

    if (!user || !user.token || user.token !== token) {
      throw HttpError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
