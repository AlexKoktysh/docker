import { Request } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JwtPayloadDto } from "../types/types";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

dotenv.config();

const { SECRET_KEY_REFRESH, SECRET_KEY_ACCESS } = process.env;

const UserRepository = AppDataSource.getRepository(User);

export const getRequestUser = async (req: Request) => {
    const token = req.cookies["refresh-token"];
    const userPayload = jwt.verify(
        token,
        `${SECRET_KEY_REFRESH}`,
    ) as JwtPayloadDto;
    const user = await UserRepository.findOne({
        where: { email: userPayload?.email ?? "" },
    });
    return user;
};
