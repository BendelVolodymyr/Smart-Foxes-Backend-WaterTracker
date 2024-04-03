import "dotenv/config";
import { User } from "../models/userModels.js";
import Jwt from "jsonwebtoken";
//import HttpError from "./HttpError.js";
//import bcrypt from "bcrypt";

export const authGoogle = async (userData) => {
  const { email } = userData;

  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    user = await User.create({
      name: userData.name,
      email,
      password: "google12345",
      avatarUrl: userData.picture,
    });
  }

  const payload = {
    id: newUser._id,
  };
  const token = Jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  user.token = token;

  await user.save();

  return { token };
};

//export const authGoogle = async (req, res, next) => {};
