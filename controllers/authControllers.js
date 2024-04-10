import { User } from "../models/userModels.js";
import PasswordReset from "../models/sendModel.js";
import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/controllerWrapper.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "node:crypto";
import timing from "../helpers/timing.js";

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
  await User.findOneAndUpdate({ _id: newUser._id }, { token });

  const modifyUser = {
    name: newUser.name,
    email: newUser.email,
    gender: newUser.gender,
    waterRate: newUser.waterRate,
    avatarURL: newUser.avatarURL,
    createAt: newUser.createdAt,
  };

  res.status(201).json({ user: modifyUser, token });
});

export const login = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is incorrect");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is incorrect");
  }
  const payload = {
    id: user._id,
  };
  const token = Jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findOneAndUpdate(user._id, { token });

  const modifyUser = {
    name: user.name,
    email: user.email,
    gender: user.gender,
    waterRate: user.waterRate,
    avatarURL: user.avatarURL,
    createAt: user.createdAt,
  };
  res.json({ user: modifyUser, token });
});

export const logout = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json("Logout success");
});

export const passwordReset = controllerWrapper(async (req, res) => {
  const { email } = req.body;
  const uniqueSendId = crypto.randomUUID();

  const user = await User.findOne({ email });
  if (user === null) {
    throw HttpError(404, "User not found");
  }

  const isTemporaryId = await PasswordReset.findOneAndUpdate(
    { userId: user._id },
    { temporaryId: uniqueSendId, userId: user._id },
    { new: true, upsert: true }
  );
  if (!isTemporaryId) {
    throw HttpError(400, "Bad request");
  }
  const { userId, temporaryId } = isTemporaryId;

  const message = {
    to: email,
    from: SENDER_EMAIL,
    subject: "Hello from Water Tracker!",
    html: `To recover your password, please click on the <a href="https://bendelvolodymyr.github.io/Smart-Foxes-WaterTracker/forgotPassword/${userId}/${temporaryId} ">New password</a>`,
  };

  await transporter.sendMail(message).then().catch(console.error);

  res.json({ message: "Email sent" });
});

export const passwordChange = controllerWrapper(async (req, res) => {
  const { password } = req.body;
  const { userId, temporaryId } = req.params;

  const hashPassword = await bcrypt.hash(password, 10);

  const idTemp = await PasswordReset.findOne({ userId, temporaryId });
  if (idTemp === null) {
    throw HttpError(
      400,
      "Your link has expired, please submit a request to update your password"
    );
  }

  const { updatedAt } = idTemp;
  const time = timing(updatedAt);
  if (time > 24) {
    throw HttpError(
      400,
      "Your link has expired, please submit a request to update your password"
    );
  }

  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { password: hashPassword },
    { new: true }
  );

  if (!user) {
    throw HttpError(400);
  }
  res.json({ message: "Password reset" });
});
