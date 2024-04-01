import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  addPortionSchema,
  updatePortionSchema,
} from "../sсhemas/waterSchemas.js";
import {
  addPortion,
  updatePortion,
  deletePortion,
  portionsPerDay,
  portionsPerMonth,
} from "../controllers/watersControllers.js";
import { authenticate } from "../middlewares/auth.js";
import isValidId from "../middlewares/isValiId.js";

const waterRouter = express.Router();
waterRouter.post("/", authenticate, validateBody(addPortionSchema), addPortion);
waterRouter.patch(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updatePortionSchema),
  updatePortion
);
waterRouter.delete("/:id", authenticate, isValidId, deletePortion);
waterRouter.get("/today", authenticate, portionsPerDay);
waterRouter.get("/month", authenticate, portionsPerMonth);

export default waterRouter;
