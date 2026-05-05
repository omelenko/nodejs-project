const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artistController");

router.get("/", artistController.getAll);
router.post("/", artistController.create);
router.post("/attach-album", artistController.attachToAlbum);

module.exports = router;
