import Joi from "joi";

export const UserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  gender: Joi.string(),
});
