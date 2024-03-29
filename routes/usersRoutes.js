import express from "express";
import {
  getCurrentUser,
  updateInfoUser,
  uploadAvatarUser,
} from "../controllers/usersControllers.js";
import { upload } from "../middlewares/upload.js";

const usersRouter = express.Router();

usersRouter.patch("/avatars", upload.single("avatar"), uploadAvatarUser);
usersRouter.get("/current", getCurrentUser);
usersRouter.patch("/", updateInfoUser);

export default usersRouter;
