import { User } from "../models/userModels.js";
import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/controllerWrapper.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const { SECRET_KEY, SENDER_EMAIL, SENDER_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 2525,
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASSWORD,
  },
});

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

export const resetPasswordSchema = controllerWrapper(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  const message = {
    to: email,
    from: SENDER_EMAIL,
    subject: "Hello from Water Tracker!",
    html: `To confirm your registration, please click on the <a href="http://localhost:3000/goit-react-hw-08-phonebook/login">New password</a>`,
  };

  await transporter.sendMail(message).then(console.log).catch(console.error);

  res.json({ message: "Email sent" });
});
