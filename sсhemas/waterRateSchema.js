import Joi from "joi";

const userSchemaWaterRate = Joi.object({
  waterRate: Joi.number().min(1).max(15000).required(),
});

export default userSchemaWaterRate;
