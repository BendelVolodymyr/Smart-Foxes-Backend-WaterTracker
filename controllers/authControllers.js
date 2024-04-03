import { User } from "../models/userModels.js";
import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/controllerWrapper.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

export const register = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  const payload = {
    id: newUser._id,
  };
  const token = Jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findOneAndUpdate({ userId: newUser._id }, { token });

  res.status(201).json({ user: newUser, token });
});

export const login = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is incorrect");
  }

  const passwordCompare = bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is incorrect");
  }
  const payload = {
    id: user._id,
  };
  const token = Jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findOneAndUpdate(user._id, { token });
  res.json({ email, token });
});

export const logout = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json("Logout success");
});
