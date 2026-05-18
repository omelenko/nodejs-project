const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const protect = require('../middleware/auth');

/**
 * @swagger
 *   /api/playlists/{id}:
 *     get:
 *       summary: Отримати плейлист за ID
 *       description: Повертає повну інформацію про плейлист разом із треками (через PlaylistTrack) та іменем творця.
 *       tags: [Playlists]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Цифровий ID плейлиста
 *       responses:
 *         200:
 *           description: Плейлист успішно знайдено
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
 *           description: Плейлист не знайдено
 *         500:
 *           description: Внутрішня помилка сервера
 */
router.get('/:id', playlistController.getById);

/**
 * @swagger
 *   /api/playlists:
 *     post:
 *       summary: Створити новий плейлист
 *       description: Створює новий порожній плейлист для поточного авторизованого користувача.
 *       tags: [Playlists]
 *       security:
 *         - BearerAuth: []
 *           requestBody:
 *             required: true
 *             content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   required:
 *                     - name
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Summer Vibes 2026"
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "My Fav Chill Beats"
 *       responses:
 *         201:
 *           description: Плейлист успішно створено
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Playlist'
 *         400:
 *           description: Некоректні дані або помилка сервера
 */
router.post('/', protect, playlistController.create);

/**
 * @swagger
 *   /api/playlists/{id}:
 *     delete:
 *       summary: Видалити плейлист за ID
 *       description: Видаляє плейлист із бази даних. Треки в таблиці Track залишаються, видаляються лише зв'язки.
 *       tags: [Playlists]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Цифровий ID плейлиста для видалення
 *       responses:
 *         204:
 *           description: Плейлист успішно видалено
 *         400:
 *           description: Помилка під час видалення
 */
router.delete('/:id', playlistController.remove);

/**
 * @swagger
 *   /api/playlists/{id}/tracks:
 *     post:
 *       summary: Додати трек до плейлиста
 *       description: Створює новий запис у проміжній таблиці PlaylistTrack для прив'язки треку до плейлиста.
 *       tags: [Playlists]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID плейлиста, куди додається трек
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - trackId
 *               properties:
 *                 trackId:
 *                   type: integer
 *                   example: 102
 *       responses:
 *         201:
 *           description: Трек успішно додано до плейлиста
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Трек додано до плейлиста"
 *                   link:
 *                     $ref: '#/components/schemas/PlaylistTrack'
 *         400:
 *           description: Не вдалося додати трек (можливо, він вже є в плейлисті)
 */
router.post('/:id/tracks', playlistController.addTrackToPlaylist);

/**
 * @swagger
 *   /api/playlists/{id}/tracks/{trackId}:
 *     delete:
 *       summary: Видалити трек із плейлиста
 *       description: Видаляє запис із проміжної таблиці за допомогою складового ключа (playlistId + trackId).
 *       tags: [Playlists]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID плейлиста
 *         - in: path
 *           name: trackId
 *           schema:
 *             type: integer
 *           required: true
 *           description: ID треку, який потрібно видалити з цього плейлиста
 *       responses:
 *         200:
 *           description: Трек успішно видалено з плейлиста
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Трек видалено з плейлиста"
 *         404:
 *           description: Зв'язок не знайдено
 */
router.delete(
  '/:id/tracks/:trackId',
  playlistController.removeTrackFromPlaylist
);

module.exports = router;
