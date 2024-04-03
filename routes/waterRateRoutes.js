import express from "express";
import { updateWaterRate } from "../controllers/waterRateControllers.js";
import userSchemaWaterRate from "../sсhemas/waterRateSchema.js";
import validateBody from "../helpers/validateBody.js";
import { authenticate } from "../middlewares/auth.js";

const waterRateRouter = express.Router();

waterRateRouter.patch(
  "/",
  authenticate,
  validateBody(userSchemaWaterRate),
  updateWaterRate
);

export default waterRateRouter;
