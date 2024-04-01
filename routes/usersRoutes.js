import express from "express";
import {
  getCurrentUser,
  updateInfoUser,
  uploadAvatarUser,
} from "../controllers/usersControllers.js";
import { upload } from "../middlewares/upload.js";
import validateBody from "../helpers/validateBody.js";
import { UserSchema } from "../shemas/userSchema.js";

const usersRouter = express.Router();

usersRouter.patch("/avatars", upload.single("avatar"), uploadAvatarUser); //потрібно додати міделвару авторизації
usersRouter.get("/current", getCurrentUser); //потрібно додати міделвару авторизації
usersRouter.patch("/", validateBody(UserSchema), updateInfoUser); //потрібно додати міделвару авторизації

export default usersRouter;
