import { Router } from "express";
import { UsersController } from "../../controllers";

const { getUsers, createUser } = UsersController;
const router = Router();

router.get("/", getUsers);
router.post("/", createUser);

export const UsersRouter = router;
