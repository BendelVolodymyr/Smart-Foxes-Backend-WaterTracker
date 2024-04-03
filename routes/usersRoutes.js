import express from "express";
import {
  getCurrentUser,
  updateInfoUser,
  uploadAvatarUser,
} from "../controllers/usersControllers.js";
import { upload } from "../middlewares/upload.js";
import validateBody from "../helpers/validateBody.js";
import { updateUserSchema } from "../sсhemas/userSchema.js";
import { authenticate } from "../middlewares/auth.js";

const usersRouter = express.Router();

usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  uploadAvatarUser
);
usersRouter.get("/current", authenticate, getCurrentUser);
usersRouter.patch(
  "/",
  authenticate,
  validateBody(updateUserSchema),
  updateInfoUser
);

export default usersRouter;
