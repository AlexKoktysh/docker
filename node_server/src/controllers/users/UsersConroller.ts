import { Request, Response } from "express";

import { UserModel } from "../../models";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (error) {
    console.log("Error getUsers controller", error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new UserModel({
      email: req.body.email,
      password: req.body.password,
    });
    const newUser = await user.save();

    res.send(newUser);
  } catch (error) {
    console.log("Error createUser controller", error);
  }
};
