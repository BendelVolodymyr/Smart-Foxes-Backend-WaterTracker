import Joi from "joi";

export const UserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
