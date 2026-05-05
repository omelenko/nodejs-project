import { Router } from "express";
import { AlbumController } from "../controllers/album.controller";

const router = Router();

router.get("/", AlbumController.getAll);
router.post("/", AlbumController.create);
router.delete("/:id", AlbumController.delete);

export default router;
