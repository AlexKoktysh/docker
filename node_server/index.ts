import express, { Express } from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import dotenv from "dotenv";

import { UsersRouter, CardsRouter } from "./src/routes";
import { AppDataSource } from "./src/data-source";

dotenv.config();

const { PORT } = process.env;

const app: Express = express();
const port = PORT ?? 5000;

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/users", UsersRouter);
app.use("/cards", CardsRouter);

const start = async () => {
    try {
        AppDataSource.initialize()
            .then(() => {
                app.listen(port, () => {
                    console.log(
                        `[server]: Server is running at http://localhost:${port}`,
                    );
                });
            })
            .catch((error) => console.log(error));
    } catch (error: any) {
        console.log("Error connection db", error);
    }
};

start();
