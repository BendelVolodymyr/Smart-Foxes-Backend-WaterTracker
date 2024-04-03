import HttpError from "../helpers/HttpError.js";
import { User } from "../models/userModels.js";

export const updateWaterRate = async (req, res) => {
  const { waterRate } = req.body;
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { waterRate });

  if (!user) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    waterRate,
  });
};
