import express from "express";
import { connectToDatabase } from "./src/services/database.service"
import { karmaRouter } from "./src/routes/karmas.router";
import * as dotenv from "dotenv";


dotenv.config();

const app = express();
const port = process.env.PORT;

connectToDatabase()
    .then(() => {
        app.use("/karmas", karmaRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });