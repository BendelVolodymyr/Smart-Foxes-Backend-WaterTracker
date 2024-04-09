import Joi from "joi";

export const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  newPassword: Joi.string(),
  oldPassword: Joi.string(),
  gender: Joi.string(),
  avatarURL: Joi.string(),
});

export const passwordResetSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const passwordUpdateSchema = Joi.object({
  password: Joi.string().required(),
});
