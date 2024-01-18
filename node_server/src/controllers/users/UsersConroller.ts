import { Request, Response } from "express";

import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

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
