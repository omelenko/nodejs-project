const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlistController");

router.post("/", playlistController.create);
router.post("/:id/tracks", playlistController.addTrack);

module.exports = router;
