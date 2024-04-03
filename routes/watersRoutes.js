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

const watersRouter = express.Router();

watersRouter.post(
  "/",
  authenticate,
  validateBody(addPortionSchema),
  addPortion
);

watersRouter.patch(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updatePortionSchema),
  updatePortion
);
watersRouter.delete("/:id", authenticate, isValidId, deletePortion);
watersRouter.get("/today", authenticate, portionsPerDay);
watersRouter.get("/month", authenticate, portionsPerMonth);

export default watersRouter;
