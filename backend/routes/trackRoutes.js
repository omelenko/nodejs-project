const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');
/**
 * @swagger
 *   /api/tracks:
 *     get:
 *       summary: Отримати всі треки з фільтрацією
 *       description: Повертає список усіх треків. Підтримує необов'язкову фільтрацію за назвою (search) та жанром (genre).
 *       tags: [Tracks]
 *       parameters:
 *         - in: query
 *           name: search
 *           schema:
 *             type: string
 *           required: false
 *           description: Пошук за назвою треку (регістронезалежний)
 *         - in: query
 *           name: genre
 *           schema:
 *             type: string
 *           required: false
 *           description: Фільтрація за жанром треку (наприклад, Rock, Pop)
 *       responses:
 *         200:
 *           description: Успішно отримано список треків
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/TrackFull'
 *         500:
 *           description: Внутрішня помилка сервера
 */
router.get('/', trackController.getAll);

/**
 * @swagger
 *   /api/tracks/{id}:
 *     get:
 *       summary: Отримати трек за ID
 *       description: Повертає повну інформацію про трек.
 *       tags: [Tracks]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Цифровий ID треку
 *       responses:
 *         200:
 *           description: Трек успішно знайдено
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 allOf:
 *                   - $ref: '#/components/schemas/Playlist'
 *                   - type: object
 *                     properties:
 *                       tracks:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             track:
 *                               $ref: '#/components/schemas/TrackMinimal'
 *         404:
 *           description: Трек не знайдено
 *         500:
 *           description: Внутрішня помилка сервера
 */
router.get('/:id', trackController.getById);

/**
 * @swagger
 *   /api/tracks:
 *     post:
 *       summary: Створити новий трек
 *       description: Створює трек та прив'язує його до виконавців (через масив artistIds). Поле albumId є необов'язковим (сингл).
 *       tags: [Tracks]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - title
 *                 - genre
 *                 - duration
 *                 - fileUrl
 *                 - artistIds
 *               properties:
 *                 title:
 *                   type: string
 *                   example: "Midnight Dreams"
 *                 genre:
 *                   type: string
 *                   example: "Synthwave"
 *                 duration:
 *                   type: string
 *                   example: 405
 *                 fileUrl:
 *                   type: string
 *                   example: "https://example.com/storage/track102.mp3"
 *                 albumId:
 *                   type: integer
 *                   example: 1
 *                 artistIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   example: [4, 7]
 *       responses:
 *         201:
 *           description: Трек успішно створено
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/TrackFull'
 *         400:
 *           description: Помилка створення або некоректні ID даних
 */
router.post('/', trackController.create);

/**
 * @swagger
 *   /api/tracks/{id}:
 *     delete:
 *       summary: Видалити трек за ID
 *       description: Видаляє трек з бази даних за його унікальним ідентифікатором.
 *       tags: [Tracks]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Цифровий ID треку, який потрібно видалити
 *       responses:
 *         204:
 *           description: Трек успішно видалено
 *         400:
 *           description: Помилка під час видалення
 */
router.delete('/:id', trackController.remove);

module.exports = router;
