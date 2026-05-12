const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

/**
 * @swagger
 * /api/albums:
 *   get:
 *     summary: Отримати список усіх альбомів
 *     tags: [Albums]
 *     responses:
 *       200:
 *         description: Список альбомів
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Album'
 *   post:
 *     summary: Створити новий альбом
 *     tags: [Albums]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *               coverUrl:
 *                 type: string
 *               releaseYear:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Альбом створено
 */
router.get('/', albumController.getAll);
router.post('/', albumController.create);

/**
 * @swagger
 * /api/albums/{id}:
 *   get:
 *     summary: Отримати альбом за ID
 *     tags: [Albums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID альбому
 *     responses:
 *       200:
 *         description: Дані альбому
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Album'
 *       404:
 *         description: Альбом не знайдено
 */
router.get('/:id', albumController.getById);

/**
 * @swagger
 * /api/albums/{id}:
 *   delete:
 *     summary: Видалити альбом за ID
 *     tags: [Albums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Альбом видалено
 */
router.delete('/:id', albumController.remove);

module.exports = router;
