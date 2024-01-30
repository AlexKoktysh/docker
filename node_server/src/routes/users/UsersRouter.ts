import { Router } from "express";
import { UsersController } from "../../controllers";

const { signIn, signUp, signOut } = UsersController;
const router = Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/signout", signOut);

export const UsersRouter = router;
