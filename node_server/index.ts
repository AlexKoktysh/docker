import express, { Express } from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import dotenv from "dotenv";
import cookies from "cookie-parser";

import { UsersRouter, CardsRouter } from "./src/routes";
import { AppDataSource } from "./src/data-source";
import {
    signIn,
    signUp,
    signOut,
} from "./src/controllers/users/UsersConroller";
import { checkAuth } from "./src/controllers/auth/AuthController";

dotenv.config();

const { PORT, SECRET_KEY_ACCESS } = process.env;

const app: Express = express();
const port = PORT ?? 5000;

app.use(cookies(`${SECRET_KEY_ACCESS}`));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);

app.use("/auth", UsersRouter);

app.use(checkAuth);
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
