import { Router } from "express";
import { TrackController } from "../controllers/track.controller";

const router = Router();

router.get("/", TrackController.getAll);
router.get("/:id", TrackController.getOne);
router.post("/", TrackController.create);
router.delete("/:id", TrackController.delete);

export default router;
