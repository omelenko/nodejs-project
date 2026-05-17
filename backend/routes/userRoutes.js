const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Отримати список усіх користувачів
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Список користувачів
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Створити користувача (адмін-панель)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Користувача створено
 */
router.get('/', userController.getAll);
router.post('/', userController.create);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Отримати профіль користувача
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID користувача
 *     responses:
 *       200:
 *         description: Дані користувача
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Користувача не знайдено
 */
router.get('/:id', userController.getById);

/**
 * @swagger
 * /api/users/{id}/favorites:
 *   post:
 *     summary: Додати трек в улюблені
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID користувача
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [trackId]
 *             properties:
 *               trackId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Трек додано в улюблені
 */
router.post('/:id/favorites', userController.addFavorite);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Реєстрація нового користувача
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Успішна реєстрація
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Авторизація користувача (Вхід)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успішний вхід, повертає токен
 *       401:
 *         description: Невірний email або пароль
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/users/{id}/favorites:
 *   delete:
 *     summary: Видалити трек з улюблених
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID користувача
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trackId:
 *                 type: integer
 *     responses:
 *       204:
 *         description: Трек видалено з улюблених
 */
router.delete('/:id/favorites', userController.removeFavorite);


/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Отримати профіль користувача
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Профіль користувача
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.post('/me', userController.me);

module.exports = router;
