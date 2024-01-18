import { DataSource } from "typeorm";
import { User } from "./entity/User";
import dotenv from "dotenv";
import { Card } from "./entity/Card";

dotenv.config();

const { DB_USER, DB_PASSWORD } = process.env;

export const AppDataSource = new DataSource({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    username: DB_USER,
    password: DB_PASSWORD,
    entities: [User, Card],
});
