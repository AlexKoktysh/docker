import express, { Express } from "express";
import { json, urlencoded } from "body-parser";
import dotenv from "dotenv";

import { UsersRouter } from "./src/routes";
import { connectDb } from "./config/db";

dotenv.config();

const { PORT } = process.env;

const app: Express = express();
const port = PORT ?? 8080;

app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/users", UsersRouter);

const start = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}!!!`);
    });
  } catch (error: any) {
    console.log("Error connection db", error);
  }
};

start();
