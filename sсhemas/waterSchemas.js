import Joi from "joi";

const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

export const addPortionSchema = Joi.object({
  date: Joi.string().pattern(dateRegex).required(),
  portion: Joi.number().required().min(1).max(5000),
});

export const updatePortionSchema = Joi.object({
  waterVolume: Joi.number().required().min(1).max(5000),
});
