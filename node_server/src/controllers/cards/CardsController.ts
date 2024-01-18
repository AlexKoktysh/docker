import { Request, Response } from "express";
import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Card } from "../../entity/Card";
import { CardStatus } from "../../types/enums";

const Repository = AppDataSource.getRepository(Card);

export const getAllCards = async (req: Request, res: Response) => {
    try {
        const allCards = await Repository.find();
        res.send(allCards);
    } catch (error) {
        console.log("Error getUsers controller", error);
    }
};

export const createCard = async (req: Request<{}, {}, Card>, res: Response) => {
    try {
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
    req: Request<{ id: string }, {}, Card>,
    res: Response,
) => {
    try {
        const updatedCard = await Repository.update(
            req.params.id as string,
            req.body,
        );
        res.send(updatedCard ? { status: "success" } : { status: "error" });
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
