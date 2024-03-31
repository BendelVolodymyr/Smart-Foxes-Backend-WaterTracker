import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  addPortion,
  updatePortion,
  deletePortion,
  portionsPerDay,
  portionsPerMonth,
} from "../controllers/watersControllers.js";
import { authenticate } from "../middlewares/auth.js";

const watersRouter = express.Router();
watersRouter.post("/", authenticate, addPortion);
watersRouter.patch("/:id", authenticate, updatePortion);
watersRouter.delete("/:id", authenticate, deletePortion);
watersRouter.get("/today", authenticate, portionsPerDay);
watersRouter.get("/month", authenticate, portionsPerMonth);

export default watersRouter;
