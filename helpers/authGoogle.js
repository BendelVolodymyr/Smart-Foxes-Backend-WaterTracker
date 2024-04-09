import "dotenv/config";
import { User } from "../models/userModels.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

const { SECRET_KEY } = process.env;

// export const authGoogle = async (userData) => {
//   const { email, name, picture } = userData;

//   const user = await User.findOne({ email });
//   if (!user) {
//     const passwordHash = await bcrypt.hash(nanoid(), 10);

//     const newUser = await User.create({
//       email,
//       password: passwordHash,
//       name,
//       avatarUrl: picture,
//     });

//     const payload = {
//       id: newUser._id,
//     };

//     const token = Jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
//     await User.findByIdAndUpdate(newUser._id, { token });

//     return token;
//   } else {
//     const payload = {
//       id: user._id,
//     };

//     const token = Jwt.sing(payload, SECRET_KEY, { expiresIn: "24h" });
//     await User.findByIdAndUpdate(user._id, { token });

//     return token;
//   }
// };

//Second variant????

// export const authGoogle = async (userData) => {
//   const { email } = userData;

//   const user = await User.findOne({ email }).select("+password");

//   if (!user) {
//     const passwordHash = await bcrypt.hash(nanoid(), 10);

//     const newUser = await User.create({
//       name: userData.name,
//       email,
//       password: passwordHash,
//       avatarUrl: userData.picture,
//     });
//     const token = Jwt.sign(newUser._id, SECRET_KEY, { expiresIn: "24h" });
//     await User.findByIdAndUpdate(newUser._id, { token });

//     return token;
//   }

//   const token = Jwt.sign(user._id, SECRET_KEY, { expiresIn: "24h" });

//   user.token = token;

//   await user.save();

//   return { token };
// };

//The third variant

export const authGoogle = async (userData) => {
  const { email } = userData;

  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    const passwordHash = await bcrypt.hash(nanoid(), 10);

    user = await User.create({
      name: userData.name,
      email,
      password: passwordHash,
    });
  }

  const token = Jwt.sign(newUser._id, SECRET_KEY, { expiresIn: "24h" });

  user.token = token;

  await user.save();

  return { token };
};
