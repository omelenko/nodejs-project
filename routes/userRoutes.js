const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.post("/", userController.create);
router.post("/:id/favorites", userController.addFavorite); // Кінцева точка для зв'язку з Favourite
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
