const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Глобальний пошук по треках, альбомах та артистах
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Пошуковий запит
 *     responses:
 *       200:
 *         description: Об'єднані результати пошуку
 */
router.get('/', searchController.globalSearch);

module.exports = router;
