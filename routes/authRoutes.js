import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../sсhemas/userSchema.js";
import {
  login,
  logout,
  register,
  passwordReset,
  passwordChange,
} from "../controllers/authControllers.js";
import { authenticate } from "../middlewares/auth.js";
import {
  passwordResetSchema,
  passwordUpdateSchema,
} from "../sсhemas/userSchema.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);

authRouter.post("/login", validateBody(loginSchema), login);

authRouter.post("/logout", authenticate, logout);

authRouter.post(
  "/passwordReset",
  validateBody(passwordResetSchema),
  passwordReset
);

authRouter.patch(
  "/passwordUpdate/:userId/:temporaryId",
  validateBody(passwordUpdateSchema),
  passwordChange
);

export default authRouter;
