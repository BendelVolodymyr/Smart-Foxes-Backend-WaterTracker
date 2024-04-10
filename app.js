import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import watersRouter from "./routes/watersRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };
import waterRateRouter from "./routes/waterRateRoutes.js";
import usersRouter from "./routes/usersRoutes.js";
import googleAuthRouter from "./routes/googleAuthRoutes.js";

const app = express();
const { DB_HOST, PORT } = process.env;

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use("/avatars", express.static("public/avatars"));

app.use("/api/auth", googleAuthRouter);

app.use("/api/users", authRouter, usersRouter);

app.use("/api/waters", watersRouter);
app.use("/api/water-rate", waterRateRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
