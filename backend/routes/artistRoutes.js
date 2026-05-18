const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

/**
 * @swagger
 *   /api/artists:
 *     get:
 *       summary: Отримати всіх артистів
 *       description: Повертає список усіх артистів із можливістю пошуку за сценічним псевдонімом (stageName).
 *       tags: [Artists]
 *       parameters:
 *         - in: query
 *           name: search
 *           schema:
 *             type: string
 *           required: false
 *           description: Пошуковий запит для фільтрації артистів за stageName (регістронезалежний)
 *       responses:
 *         200:
 *           description: Успішно отримано список артистів
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Artist'
 *         500:
 *           description: Внутрішня помилка сервера
 */
router.get('/', artistController.getAll);

/**
 * @swagger
 *   /api/artists:
 *     post:
 *       summary: Створити профіль артиста
 *       description: Створює новий профіль артиста та прив'язує його до поточного авторизованого користувача (User).
 *       tags: [Artists]
 *       security:
 *         - BearerAuth: []
 *           requestBody:
 *             required: true
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   required:
 *                     - stageName
 *                 properties:
 *                   stageName:
 *                     type: string
 *                     example: "Luna Rivers"
 *                   firstName:
 *                     type: string
 *                     example: "Марія"
 *                   lastName:
 *                     type: string
 *                     example: "Ковальчук"
 *                   bio:
 *                     type: string
 *                     example: "Indie pop artist from Ukraine"
 *                   country:
 *                     type: string
 *                     example: "Ukraine"
 *                   avatarUrl:
 *                     type: string
 *                     example: "https://example.com/avatar.jpg"
 *                   bannerUrl:
 *                     type: string
 *                     example: "https://example.com/banner.jpg"
 *       responses:
 *         201:
 *           description: Профіль артиста успішно створено
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Artist'
 *         400:
 *           description: Псевдонім уже зайнятий або у користувача вже є профіль артиста
 */
router.post('/', artistController.create);

/**
 * @swagger
 *   /api/artists/{id}:
 *     get:
 *       summary: Отримати публічний профіль артиста за ID
 *       description: Повертає детальну інформацію про артиста разом із його треками та альбомами через проміжні таблиці Prisma.
 *       tags: [Artists]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Унікальний цифровий ID артиста
 *       responses:
 *         200:
 *           description: Артиста успішно знайдено
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 allOf:
 *                   - $ref: '#/components/schemas/Artist'
 *                   - type: object
 *                     properties:
 *                       tracks:
 *                         type: array
 *                         items:
 *                           type: object
 *                       albums:
 *                         type: array
 *                         items:
 *                           type: object
 *         404:
 *           description: Артиста не знайдено
 *         500:
 *           description: Внутрішня помилка сервера
 */
router.get('/:id', artistController.getById);

/**
 * @swagger
 *   /api/artists/{id}:
 *     delete:
 *       summary: Видалити профіль артиста
 *       description: Видаляє профіль артиста з бази даних за його ID.
 *       tags: [Artists]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Цифровий ID артиста для видалення
 *       responses:
 *         204:
 *           description: Профіль артиста успішно видалено
 *         400:
 *           description: Помилка під час видалення
 */
router.delete('/:id', artistController.remove);

module.exports = router;
