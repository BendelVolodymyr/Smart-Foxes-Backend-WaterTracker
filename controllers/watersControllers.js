import Water from "../models/watersModel.js";
import HttpError from "../helpers/HttpError.js";
import crypto from "crypto";

export const addPortion = async (req, res, next) => {
  const { _id: owner, waterRate } = req.user;
  const { portion, date } = req.body;
  const dateAdded = new Date(date);
  try {
    const createPortion = await Water.create({
      dateAdded,
      portion,
      waterRate: 1500,
      owner,
    });
    if (!createPortion) {
      throw HttpError(400);
    }
    return res.status(201).json({ data: createPortion });
  } catch (error) {
    next(error);
  }
};

export const updatePortion = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const { portion } = req.body;
  try {
    const dataUpdated = await Water.findOneAndUpdate(
      { owner, _id: id },
      { portion: portion },
      { new: true }
    );
    if (!dataUpdated) {
      throw HttpError(404, "Portion not found");
    }
    res.json({ data: dataUpdated });
  } catch (error) {
    next(error);
  }
};

export const deletePortion = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  try {
    const deletedPortion = await Water.findOneAndDelete({ _id: id, owner });
    if (!deletedPortion) {
      throw HttpError(404, "Not found");
    }
    res.json({ data: deletedPortion });
  } catch (error) {
    next(error);
  }
};

export const portionsPerDay = async (req, res, next) => {
  const { date } = req.query;
  const { _id: owner } = req.user;
  try {
    const startOfDay = new Date(date).setHours(0, 0, 0, 0);
    const endOfDay = new Date(date).setHours(23, 59, 59, 999);

    const dataForTheDay = await Water.find({
      owner: owner,
      dateAdded: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });
    let countPercentage = 0;

    const portions = dataForTheDay.map((el) => {
      const { waterRate, portion } = el;
      const percentage = Math.round((portion / waterRate) * 100);
      countPercentage += percentage;
      return { ...el.toObject(), percentage };
    });
    let sumPortions = portions.length;
    res.json({ data: { sumPortions, countPercentage, portions } });
  } catch (error) {
    next(error);
  }
};

export const portionsPerMonth = async (req, res, next) => {
  const { startDate, endDate } = req.query;
  const { _id: owner } = req.user;
  try {
    const startOfDay = new Date(startDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(endDate);
    endOfDay.setHours(23, 59, 59, 999);
    const dataForTheMonth = await Water.aggregate([
      {
        $match: {
          owner: owner,
          dateAdded: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$dateAdded" } },
          totalPortion: { $sum: "$portion" },
          count: { $sum: 1 },
          waterRate: { $last: "$waterRate" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const monthData = dataForTheMonth.map((el) => {
      el.percent = Math.round((el.totalPortion / el.waterRate) * 100);
      const date = new Date(el._id);
      const monthName = date.toLocaleString("en-US", { month: "long" });
      el.date = date.getDate() + ", " + monthName;
      return el;
    });

    res.json({ data: { monthData } });
  } catch (error) {}
};
