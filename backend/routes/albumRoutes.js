const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

/**
 * @swagger
 *   /api/albums:
 *     get:
 *       summary: Отримати всі альбоми
 *       description: Повертає список усіх альбомів разом із їхніми виконавцями. Підтримує фільтрацію за назвою альбому.
 *       tags: [Albums]
 *       parameters:
 *         - in: query
 *           name: search
 *           schema:
 *             type: string
 *           required: false
 *           description: Пошуковий запит для фільтрації альбомів за назвою
 *       responses:
 *         200:
 *           description: Успішно отримано список альбомів
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Album'
 *         500:
 *           description: Внутрішня помилка сервера
 */
router.get('/', albumController.getAll);

/**
 * @swagger
 *   /api/albums:
 *     post:
 *       summary: Створити новий альбом
 *       description: Створює новий альбом та пов'язує його з виконавцями через масив їхніх ID.
 *       tags: [Albums]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - title
 *                 - releaseYear
 *                 - artistIds
 *               properties:
 *                 title:
 *                   type: string
 *                   example: "Vibe Check"
 *                 coverUrl:
 *                   type: string
 *                   example: "https://images.example.com/cover.jpg"
 *                 releaseYear:
 *                   type: integer
 *                   example: 2026
 *                 artistIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   example: [1, 3]
 *       responses:
 *         201:
 *           description: Альбом успішно створено
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 15
 *                   title:
 *                     type: string
 *                   coverUrl:
 *                     type: string
 *                   releaseYear:
 *                     type: integer
 *         400:
 *           description: Помилка валідації або некоректні дані
 */
router.post('/', albumController.create);

/**
 * @swagger
 *   /api/albums/{id}:
 *     delete:
 *       summary: Видалити альбом за ID
 *       description: Видаляє альбом з бази даних за його унікальним ідентифікатором.
 *       tags: [Albums]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Цифровий ID альбому для видалення
 *       responses:
 *         204:
 *           description: Альбом успішно видалено (відповідь порожня)
 *         404:
 *           description: Альбом із таким ID не знайдено
 *         500:
 *           description: Внутрішня помилка сервера
 */
router.delete('/:id', albumController.remove);

/**
 * @swagger
 *   /api/albums/{id}:
 *     get:
 *       summary: Отримати альбом за ID
 *       description: Повертає детальну інформацію про конкретний альбом, включаючи список його треків та артистів.
 *       tags: [Albums]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Унікальний ID альбому
 *       responses:
 *         200:
 *           description: Альбом успішно знайдено
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 allOf:
 *                   - $ref: '#/components/schemas/Album'
 *                   - type: object
 *                     properties:
 *                       tracks:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/TrackMinimal'
 *         404:
 *           description: Альбом не знайдено
 *         500:
 *           description: Внутрішня помилка сервера
 */
router.get('/:id', albumController.getById);

/**
 * @swagger
 *   /api/albums/filter/{year}:
 *     get:
 *       summary: Фільтрація альбомів за роком випуску
 *       description: Повертає список усіх альбомів, що були випущені у вказаний рік.
 *       tags: [Albums]
 *       parameters:
 *         - in: path
 *           name: year
 *           schema:
 *             type: integer
 *           required: true
 *           description: Рік для фільтрації альбомів
 *       responses:
 *         200:
 *           description: Успішно отримано відфільтровані альбоми
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   allOf:
 *                     - $ref: '#/components/schemas/Album'
 *                     - type: object
 *                       properties:
 *                         tracks:
 *                           type: array
 *                           items:
 *                              $ref: '#/components/schemas/TrackMinimal'
 *         400:
 *           description: Некоректний або відсутній параметр року
 *         500:
 *           description: Внутрішня помилка сервера
 */
router.get('/filter/:year', albumController.getByYear);

module.exports = router;
