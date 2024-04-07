import Water from "../models/watersModel.js";
import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/controllerWrapper.js";

export const addPortion = controllerWrapper(async (req, res) => {
  const { _id: owner, waterRate } = req.user;
  const { waterVolume, date } = req.body;

  const dateAdded = new Date(date.replace(/T/, " "));
  const createPortion = await Water.create({
    dateAdded,
    waterVolume,
    waterRate,
    owner,
  });
  if (!createPortion) {
    throw HttpError(400, "Failed to add portion.");
  }
  const { _id } = createPortion;
  return res.status(201).json({
    data: {
      _id,
      dateAdded,
      waterVolume,
    },
  });
});

export const updatePortion = controllerWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const { waterVolume, date } = req.body;
  const dateAdded = new Date(date.replace(/T/, " "));
  const dataUpdated = await Water.findOneAndUpdate(
    { owner, _id: id },
    { waterVolume: waterVolume, dateAdded: dateAdded },
    { new: true }
  );
  if (!dataUpdated) {
    throw HttpError(404, "Update failed. Please try again later.");
  }
  res.json({ data: { id, waterVolume, dateAdded } });
});

export const deletePortion = controllerWrapper(async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const deletedPortion = await Water.findOneAndDelete({ _id: id, owner });
  if (!deletedPortion) {
    throw HttpError(404, "Delete failed. Please try again later.");
  }

  res.json({
    data: deletedPortion,
    message: "The portion was successfully deleted.",
  });
});

export const portionsPerDay = controllerWrapper(async (req, res) => {
  const { date } = req.query;
  const { _id: owner } = req.user;

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const dataForTheDay = await Water.find({
    owner: owner,
    dateAdded: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });

  if (!dataForTheDay.length) {
    return res.json({
      data: [],
      message: "No data found for the specified date.",
    });
  }

  let countPercentage = 0;
  const portions = dataForTheDay.map((el) => {
    const { waterRate, waterVolume } = el;
    const percentage = Math.round((waterVolume / waterRate) * 100);
    countPercentage += percentage;
    return { ...el.toObject(), percentage };
  });

  const sumPortions = portions.length;

  res.json({ data: { sumPortions, countPercentage, portions } });
});

export const portionsPerMonth = controllerWrapper(async (req, res) => {
  const { startDate, endDate } = req.query;
  const { _id: owner } = req.user;

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
        totalWaterDrunk: { $sum: "$waterVolume" },
        totalPortions: { $sum: 1 },
        waterRate: { $last: "$waterRate" },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  if (!dataForTheMonth.length) {
    return res.json({
      data: {
        monthData: [],
        message: "No water intake data found for the specified date range.",
      },
    });
  }

  const monthData = dataForTheMonth.map((el) => {
    const percentagePerDay = Math.round(
      (el.totalWaterDrunk / el.waterRate) * 100
    );
    const date = new Date(el._id);
    const monthName = date.toLocaleString("en-US", { month: "long" });
    el.date = date.getDate() + ", " + monthName;
    return { ...el, percentagePerDay };
  });

  res.json({ data: { monthData } });
});
