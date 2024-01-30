import { Request, Response } from "express";
import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Card } from "../../entity/Card";
import { CardStatus } from "../../types/enums";
import { ListItems } from "../../types/types";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../../entity/User";

export class JwtPayloadDto {
    readonly id: string;
    readonly email: string;
}

dotenv.config();

const { SECRET_KEY_ACCESS } = process.env;

const Repository = AppDataSource.getRepository(Card);
const UserRepository = AppDataSource.getRepository(User);

export const getAllCards = async (req: Request, res: Response) => {
    try {
        const allCards = await Repository.find();
        const response = allCards.reduce(
            (acc: ListItems, el) => {
                acc[el.status]?.items?.push(el);
                return acc;
            },
            {
                TO_DO: {
                    name: "Index.toDo",
                    id: "dropzone1",
                    items: [],
                },
                IN_PROGRESS: {
                    name: "Index.inProgress",
                    id: "dropzone2",
                    items: [],
                },
                IN_TEST: {
                    name: "Index.inTest",
                    id: "dropzone3",
                    items: [],
                },
                IN_COMPLETED: {
                    name: "Index.inCompleted",
                    id: "dropzone4",
                    items: [],
                },
            },
        );
        res.send(response);
    } catch (error) {
        console.log("Error getAllCards controller", error);
    }
};

export const createCard = async (req: Request<{}, {}, Card>, res: Response) => {
    try {
        const token = req.cookies["access-token"];
        const userPayload = jwt.verify(
            token,
            `${SECRET_KEY_ACCESS}`,
        ) as JwtPayloadDto;
        const user = await UserRepository.findOne({
            where: { email: userPayload?.email ?? "" },
        });
        console.log("user", user);
        const newCard = Repository.create({
            ...req.body,
            status: req.body.status ?? CardStatus.TO_DO,
        });
        await Repository.save(newCard);
        res.send(newCard);
    } catch (error) {
        console.log("Error createCard controller", error);
    }
};

export const getCardById = async (
    req: Request<{ id: FindOneOptions<Card> }>,
    res: Response,
) => {
    try {
        const card = await Repository.findOne(req.params.id);
        res.send(card);
    } catch (error) {
        console.log("Error deleteCard controller", error);
    }
};

export const updateCard = async (
    req: Request<{ id: string | FindOneOptions<Card> }, {}, Card>,
    res: Response,
) => {
    try {
        await Repository.update(req.params.id as string, req.body);
        const card = await Repository.findOne(
            req.params.id as FindOneOptions<Card>,
        );
        res.send(card);
    } catch (error) {
        console.log("Error updateCard controller", error);
    }
};

export const deleteCard = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    try {
        const deleteCard = await Repository.delete(req.params.id);
        res.send(deleteCard ? { status: "success" } : { status: "error" });
    } catch (error) {
        console.log("Error deleteCard controller", error);
    }
};
