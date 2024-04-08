import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleMongooseError } from "../middlewares/handleMongooseError.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const usersSchema = new Schema(
  {
    name: {
      type: String,
      default: "User",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    oldPassword: {
      type: String,
    },
    newPassword: {
      type: String,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    waterRate: {
      type: Number,
      min: 0,
      max: 15000,
      default: 2000,
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

usersSchema.post("save", handleMongooseError);

export const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().empty(false).messages({
    "string.base": "The email must be a string.",
    "any.required": "The email field is required.",
    "string.empty": "The email must not be empty.",
    "string.pattern.base": "The email must be in format test@gmail.com.",
  }),
  password: Joi.string().min(8).max(64).required().empty(false).messages({
    "string.base": "The password must be a string.",
    "any.required": "The password field is required.",
    "string.empty": "The password can not be empty.",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().empty(false).messages({
    "string.base": "The email must be a string.",
    "any.required": "The email field is required.",
    "string.empty": "The email must not be empty.",
    "string.pattern.base": "The email must be in format test@gmail.com.",
  }),
  password: Joi.string().min(8).max(64).required().empty(false).messages({
    "string.base": "The password must be a string.",
    "any.required": "The password field is required.",
    "string.empty": "The password can not be empty.",
    "string.min":
      "The password must be at least 8 and no more than 64 characters long",
  }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegexp).required().empty(false).messages({
    "string.base": "The email must be a string.",
    "any.required": "The email field is required.",
    "string.empty": "The email must not be empty.",
    "string.pattern.base": "The email must be in format test@gmail.com.",
  }),
  password: Joi.string().min(8).max(64).required().empty(false).messages({
    "string.base": "The password must be a string.",
    "any.required": "The password field is required.",
    "string.empty": "The password can not be empty.",
    "string.min":
      "The password must be at least 8 and no more than 64 characters long",
  }),
  newPassword: Joi.string().min(8).max(64).required().empty(false).messages({
    "string.base": "The password must be a string.",
    "any.required": "The password field is required.",
    "string.empty": "The password can not be empty.",
    "string.min":
      "The password must be at least 8 and no more than 64 characters long",
  }),
  gender: Joi.string(),
  avatarURL: Joi.string(),
});
export const User = model("users", usersSchema);
