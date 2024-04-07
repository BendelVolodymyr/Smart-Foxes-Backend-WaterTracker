import "dotenv/config";
import { User } from "../models/userModels.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

const { SECRET_KEY } = process.env;

export const authGoogleHelper = async (userData) => {
  const { email, name, picture } = userData;

  const userExist = await User.findOne({ email });
  if (!userExist) {
    const verificationToken = nanoid();
    const passwordHash = await bcrypt.hash(nanoid(), 10);

    const newUser = await User.create({
      email,
      password: passwordHash,
      name,
      avatarUrl: picture,
      verificationToken,
    });
    const payload = {
      id: newUser._id,
    };

    const token = Jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate(newUser._id, { token });
    return token;
  } else {
    const payload = {
      id: userExist._id,
    };

    const token = Jwt.sing(payload, SECRET_KEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate(userExist._id, { token });

    return token;
  }
};

//Second variant????

// export const authGoogleHelper = async (userData) => {
//   const { email } = userData;

//   let user = await User.findOne({ email }).select("+password");

//   if (!user) {
//     user = await User.create({
//       name: userData.name,
//       email,
//       password: "google12345",
//       avatarUrl: userData.picture,
//     });
//   }

//   const payload = {
//     id: user._id,
//   };
//   const token = Jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
//   user.token = token;

//   await user.save();

//   return { token };
// };
