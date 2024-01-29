import { Router } from "express";
import { UsersController } from "../../controllers";

const { signIn, signUp, getUsers } = UsersController;
const router = Router();

router.get("/", getUsers);

export const UsersRouter = router;
