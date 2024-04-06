import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../models/userModels.js";
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

// signup
authRouter.post("/register", validateBody(registerSchema), register);

// signin
authRouter.post("/login", validateBody(loginSchema), login);

// logout
authRouter.post("/logout", authenticate, logout);
// update password
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
