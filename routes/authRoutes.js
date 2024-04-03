import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../models/userModels.js";
import { login, logout, register } from "../controllers/authControllers.js";
import autorization from "../middlewares/authorization.js";

const authRouter = express.Router();

// signup
authRouter.post("/register", validateBody(registerSchema), register);

// signin
authRouter.post("/login", validateBody(loginSchema), login);

// logout
authRouter.post("/logout", autorization, logout);

export default authRouter;
