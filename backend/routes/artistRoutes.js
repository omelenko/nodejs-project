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
 * /api/artists/{id}:
 *   get:
 *     summary: Отримати артиста за ID
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID артиста
 *     responses:
 *       200:
 *         description: Дані артиста
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Album'
 *       404:
 *         description: Артиста не знайдено
 */
router.get('/:id', artistController.getById);

/**
 * @swagger
 * /api/artists/{id}:
 *   delete:
 *     summary: Видалити артиста за ID
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Артиста видалено
 */
router.delete('/:id', artistController.remove);

module.exports = router;
