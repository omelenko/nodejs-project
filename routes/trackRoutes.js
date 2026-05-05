const express = require("express");
const router = express.Router();
const trackController = require("../controllers/trackController");

router.get("/", trackController.getAll);
router.post("/", trackController.create);

module.exports = router;
