const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

/**
 * @swagger
 * /api/playlists:
 *   post:
 *     summary: Створити новий плейлист
 *     tags: [Playlists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, creatorId]
 *             properties:
 *               name:
 *                 type: string
 *               creatorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Плейлист створено
 */
router.post('/', playlistController.create);

/**
 * @swagger
 * /api/playlists/{id}/tracks:
 *   post:
 *     summary: Додати трек до плейлиста
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID плейлиста
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
 *         description: Трек додано до плейлиста
 */
router.post('/:id/tracks', playlistController.addTrack);

module.exports = router;