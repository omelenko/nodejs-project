const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');

/**
 * @swagger
 * /api/tracks:
 *   get:
 *     summary: Отримати список усіх треків
 *     tags: [Tracks]
 *     responses:
 *       200:
 *         description: Список треків
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Track'
 *   post:
 *     summary: Завантажити/створити новий трек
 *     tags: [Tracks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, duration, fileUrl]
 *             properties:
 *               title:
 *                 type: string
 *               genre:
 *                 type: string
 *               duration:
 *                 type: integer
 *               fileUrl:
 *                 type: string
 *               albumId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Трек успішно створено
 */
router.get('/', trackController.getAll);
router.post('/', trackController.create);

/**
 * @swagger
 * /api/tracks/{id}:
 *   delete:
 *     summary: Видалити трек за ID
 *     tags: [Tracks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Трек видалено
 */
router.delete('/:id', trackController.remove);
/**
 * @swagger
 * /api/tracks/filter/genre:
 *   get:
 *     summary: Отримати треки за конкретним жанром
 *     tags: [Tracks]
 *     parameters:
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         required: true
 *         description: Назва жанру (наприклад, Rock, Pop, Jazz)
 *     responses:
 *       200:
 *         description: Список знайдених треків
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Track'
 *       400:
 *         description: Не вказано жанр
 *       500:
 *         description: Помилка сервера
 */
router.get('/filter/genre', trackController.getByGenre);

module.exports = router;
