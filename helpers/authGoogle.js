import "dotenv/config";
import { User } from "../models/userModels.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

const { SECRET_KEY } = process.env;

export const authGoogle = async (userData) => {
  const { email, name, picture } = userData;

  const user = await User.findOne({ email });

  if (!user) {
    const passwordHash = await bcrypt.hash(nanoid(), 10);
    const tokenVerify = nanoid();
    const newUser = await User.create({
      email,
      password: passwordHash,
      name: name,
      avatarURL: picture,
      tokenVerify,
    });

    const payload = {
      id: newUser._id,
    };

    const token = Jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate(newUser._id, { token });

    return token;
  } else {
    const payload = {
      id: user._id,
    };

    const token = Jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate(user._id, { token });

    return token;
  }
};
