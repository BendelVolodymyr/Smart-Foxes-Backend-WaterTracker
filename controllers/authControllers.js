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
    throw HttpError(409, "Email is already in use");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = User.create({ ...req.body, password: hashedPassword });

  res.status(201).json(newUser);
});

export const login = controllerWrapper(async (req, res) => {
  const { email, password, gender } = req.body;
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

  //   await User.findOneAndUpdate(user._id, { token });
  res.json({ email, token, gender });
});
