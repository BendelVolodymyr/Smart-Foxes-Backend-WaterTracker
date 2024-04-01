import express from "express";
import { updateWaterRate } from "../controllers/waterRateControllers.js";
import userSchemaWaterRate from "../shemas/waterRateSchema.js";
import validateBody from "../helpers/validateBody.js";

const waterRateRouter = express.Router();

waterRateRouter.patch("/", validateBody(userSchemaWaterRate), updateWaterRate); //потрібно додати міделвару авторизації

export default waterRateRouter;
