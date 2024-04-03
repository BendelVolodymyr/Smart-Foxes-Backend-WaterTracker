import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../models/userModels.js";
import { login, logout, register } from "../controllers/authControllers.js";
import { authenticate } from "../middlewares/auth.js";

const authRouter = express.Router();

// signup
authRouter.post("/register", validateBody(registerSchema), register);

// signin
authRouter.post("/login", validateBody(loginSchema), login);

// logout
authRouter.post("/logout", authenticate, logout);

export default authRouter;
