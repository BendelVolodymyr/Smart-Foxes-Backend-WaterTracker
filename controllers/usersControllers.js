import bcrypt from "bcrypt";
import { User } from "../models/userModels.js";
import HttpError from "../helpers/HttpError.js";
import * as fs from "node:fs/promises";
import cloudinary from "../middlewares/cloudinary.js";

export const getCurrentUser = (req, res) => {
  const { email, gender, waterRate, name = "", avatarURL } = req.user;
  res.json({
    email,
    gender,
    waterRate,
    name,
    avatarURL,
  });
};

export const updateInfoUser = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (oldPassword) {
      if (!newPassword) throw HttpError(400, "New password not found");
      if (oldPassword === newPassword)
        throw HttpError(
          400,
          "The new password must be different from the old password"
        );
      const passwordCompare = await bcrypt.compare(
        oldPassword,
        req.user.password
      );
      if (!passwordCompare) {
        throw HttpError(401, "Old Password is wrong");
      }
    }

    if (newPassword) {
      if (!oldPassword) throw HttpError(400, "Old password not found");
      delete req.body.oldPassword;
      req.body.password = await bcrypt.hash(newPassword, 10);
      delete req.body.newPassword;
    }

    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    const { name, gender, email } = user;
    res.json({
      name,
      gender,
      email,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadAvatarUser = async (req, res, next) => {
  try {
    if (!req.file) {
      throw HttpError(400, "Avatar must be provided");
    }
    const { _id } = req.user;
    const { path } = req.file;
    const { url: avatarURL } = await cloudinary.uploader.upload(req.file.path, {
      folder: "user_avatars",
      width: 250,
      height: 250,
      crop: "pad",
    });
    await fs.unlink(path);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};
