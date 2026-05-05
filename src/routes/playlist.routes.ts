import { Router } from "express";
import { PlaylistController } from "../controllers/playlist.controller";

const router = Router();

router.get("/", PlaylistController.getAll);
router.post("/", PlaylistController.create);
router.post("/add-track", PlaylistController.addTrack); // Додавання треку в плейлист
router.delete("/:id", PlaylistController.delete);

export default router;
