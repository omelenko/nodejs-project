import { Router } from "express";
import { FavouriteController } from "../controllers/favourite.controller";

const router = Router();

router.get("/user/:userId", FavouriteController.getByUser);
router.post("/", FavouriteController.add);
router.delete("/", FavouriteController.remove); // Видалення через body (userId та trackId)

export default router;
