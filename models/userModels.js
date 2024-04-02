import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleMongooseError } from "../middlewares/handleMongooseError.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const usersSchema = new Schema(
  {
    name: {
      type: String, //прибрала required()
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
      minlength: 8,
      maxlength: 64,
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
      default: 2000,
      min: 0,
      max: 15000,
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
  name: Joi.string(), //прибрала required()
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
  gender: Joi.string(),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
});

export const User = model("users", usersSchema);
