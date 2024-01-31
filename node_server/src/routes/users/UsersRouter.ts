import { Router } from "express";
import { UsersController } from "../../controllers";

const { signIn, signUp, signOut, refreshToken } = UsersController;
const router = Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/signout", signOut);
router.get("/refresh", refreshToken);

export const UsersRouter = router;
