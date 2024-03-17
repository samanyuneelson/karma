import express from "express";
import { connectToDatabase } from "./src/services/database.service";
import * as dotenv from "dotenv";
import { karmaRouter, trackerRouter } from "./src/routes";
import cors from "cors"

dotenv.config();

const app = express();
const port = process.env.PORT;

connectToDatabase()
  .then(() => {
    app.use(cors())
    app.use("/karmas", karmaRouter);
    app.use("/tracker", trackerRouter);
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
