import Joi from "joi";

const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

export const addPortionSchema = Joi.object({
  date: Joi.string().pattern(dateRegex).required(),
  waterVolume: Joi.number().required().min(1).max(5000),
});

export const updatePortionSchema = Joi.object({
  waterVolume: Joi.number().required().min(1).max(5000),
  date: Joi.string().pattern(dateRegex).required().messages({
    "string.pattern.base":
      "Date should match the format YYYY-MM-DDTHH:mm:ss.SSSZ",
    "string.empty": "Date is required",
  }),
});
