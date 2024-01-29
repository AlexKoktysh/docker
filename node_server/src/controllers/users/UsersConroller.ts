import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { compare } from "bcryptjs";
import ms from "ms";
import { getTokens, hashPassword } from "../crypto/CryptoController";

const Repository = AppDataSource.getRepository(User);

export const signUp = async (req: Request, res: Response) => {
    try {
        const isEmailExists = !!(await Repository.findOne({
            where: { email: req.body.email },
        }));
        if (isEmailExists) {
            return res.status(404).send({ error: "Email already exists" });
        }
        const password = await hashPassword(req.body.password);
        const newUser = Repository.create({
            ...req.body,
            password: password,
        });
        await Repository.save(newUser);
        const { accessToken, refreshToken } = getTokens(req.body.email);
        res.cookie("access-token", accessToken, {
            httpOnly: true,
            path: "/",
            expires: new Date(Date.now() + ms("24h")),
        });
        res.cookie("refresh-token", refreshToken, {
            httpOnly: true,
            path: "/",
            expires: new Date(Date.now() + ms("3 days")),
        });
        res.send(newUser);
    } catch (error: any) {
        res.status(500).send({ error: "Sorry, try again" });
    }
};
export const signIn = async (req: Request, res: Response) => {
    try {
        const user = await Repository.findOne({
            where: { email: req.body.email },
        });
        if (!user) {
            return res.status(404).send({ error: "Wrong email or password." });
        }
        const isPasswordValid = await compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(404).send({ error: "Wrong email or password." });
        }
        const { accessToken, refreshToken } = getTokens(req.body.email);
        res.cookie("access-token", accessToken, {
            httpOnly: true,
            path: "/",
            expires: new Date(Date.now() + ms("24h")),
        });
        res.cookie("refresh-token", refreshToken, {
            httpOnly: true,
            path: "/",
            expires: new Date(Date.now() + ms("3 days")),
        });
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: "Sorry, try again" });
    }
};
export const refreshToken = async (req: Request, res: Response) => {
    try {
    } catch (error) {
        console.log("Error refreshToken controller", error);
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const allUsers = await userRepository.find();
        res.send(allUsers);
    } catch (error) {
        console.log("Error getUsers controller", error);
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        // const user = new UserModel({
        //     email: req.body.email,
        //     password: req.body.password,
        // });
        // const newUser = await user.save();
        // res.send(newUser);
    } catch (error) {
        console.log("Error createUser controller", error);
    }
};
