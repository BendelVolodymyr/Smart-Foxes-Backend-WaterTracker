import express from "express";
import {
  googleAuth,
  googleRedirect,
} from "../controllers/authGoogleControllers.js";

const googleAuthRouter = express.Router();

googleAuthRouter.get("/google", googleAuth);
googleAuthRouter.get("/google-redirect", googleRedirect);

export default googleAuthRouter;
