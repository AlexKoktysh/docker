import { Router } from "express";
import { CardsController } from "../../controllers";

const router = Router();

const { getAllCards, createCard, deleteCard, getCardById, updateCard } =
    CardsController;

router.get("/", getAllCards);

router.post("/", createCard);
router.get("/:id", getCardById);
router.patch("/:id", updateCard);
router.delete("/:id", deleteCard);

export const CardsRouter = router;
