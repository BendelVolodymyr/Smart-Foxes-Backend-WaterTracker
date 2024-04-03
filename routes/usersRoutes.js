import express from "express";
import {
  getCurrentUser,
  updateInfoUser,
  uploadAvatarUser,
} from "../controllers/usersControllers.js";
import { upload } from "../middlewares/upload.js";
import validateBody from "../helpers/validateBody.js";
import { updateUserSchema } from "../models/userModels.js";
import { authenticate } from "../middlewares/auth.js";

const usersRouter = express.Router();

usersRouter.patch("/avatars", upload.single("avatar"), uploadAvatarUser); //потрібно додати міделвару авторизації
usersRouter.get("/current", getCurrentUser); //потрібно додати міделвару авторизації
usersRouter.patch(
  "/",
  authenticate,
  validateBody(updateUserSchema),
  updateInfoUser
); //потрібно додати міделвару авторизації

export default usersRouter;
