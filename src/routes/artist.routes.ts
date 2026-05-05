import { Router } from "express";
import { ArtistController } from "../controllers/artist.controller";

const router = Router();

router.get("/", ArtistController.getAll);
router.get("/:id", ArtistController.getOne);
router.post("/", ArtistController.create);
router.delete("/:id", ArtistController.delete);

export default router;
