import Joi from "joi";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const registerSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
  gender: Joi.string(),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegexp).required(),
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
  gender: Joi.string(),
  avatarURL: Joi.string(),
});

export const UserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string(),
  gender: Joi.string(),
});

export const passwordResetSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const passwordUpdateSchema = Joi.object({
  password: Joi.string().required(),
});
