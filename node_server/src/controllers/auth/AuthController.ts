import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

export class JwtPayloadDto {
    readonly id: string;
    readonly email: string;
}

dotenv.config();

const { SECRET_KEY_ACCESS } = process.env;

const Repository = AppDataSource.getRepository(User);

export const checkAuth = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.cookies["access-token"];
    if (!token) {
        return next(res.status(401).send({ error: "Unauthorized" }));
    }
    const userPayload = jwt.verify(
        token,
        `${SECRET_KEY_ACCESS}`,
    ) as JwtPayloadDto;
    const user = await Repository.findOne({
        where: { email: userPayload?.email ?? "" },
    });
    if (!user) {
        return next(res.status(401).send({ error: "Unauthorized" }));
    }
    return next();
};
