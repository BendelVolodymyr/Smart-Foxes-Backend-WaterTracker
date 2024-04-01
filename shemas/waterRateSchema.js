import Joi from "joi";

export const userSchemaWaterRate = Joi.object({
  waterRate: Joi.number().min(1).max(15000).required(),
});
