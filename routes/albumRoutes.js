const express = require("express");
const router = express.Router();
const albumController = require("../controllers/albumController");

router.get("/", albumController.getAll);
router.get("/:id", albumController.getById);
router.post("/", albumController.create);

module.exports = router;
