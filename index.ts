import express, { Express } from "express";
import { json, urlencoded } from "body-parser";
import { connect } from "mongoose";
import dotenv from "dotenv";

import { UsersRouter } from "./src/routes";

dotenv.config();

const { PORT, DB_USER, DB_PASSWORD } = process.env;

const app: Express = express();
const port = PORT ?? 8080;

app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/users", UsersRouter);

const start = async () => {
  try {
    await connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@docker.slnoitu.mongodb.net/?retryWrites=true&w=majority`
    );
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}!!!`);
    });
  } catch (error: any) {
    console.log("Error connection db", error);
  }
};

start();
