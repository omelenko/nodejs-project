const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

/**
 * @swagger
 * /api/artists:
 *   get:
 *     summary: Отримати всіх виконавців
 *     tags: [Artists]
 *     responses:
 *       200:
 *         description: Список виконавців
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Artist'
 *   post:
 *     summary: Створити профіль виконавця
 *     tags: [Artists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Artist'
 *     responses:
 *       201:
 *         description: Виконавця створено
 */
router.get('/', artistController.getAll);
router.post('/', artistController.create);

/**
 * @swagger
 * /api/artists/attach-album:
 *   post:
 *     summary: Прив'язати виконавця до альбому (співавторство)
 *     tags: [Artists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [artistId, albumId]
 *             properties:
 *               artistId:
 *                 type: integer
 *               albumId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Виконавця успішно додано до альбому
 */
router.post('/attach-album', artistController.attachToAlbum);

module.exports = router;