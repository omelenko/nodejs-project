const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc'); // Додано
const swaggerUi = require('swagger-ui-express'); // Додано
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Імпорт роутерів
const userRoutes = require('./routes/userRoutes');
const artistRoutes = require('./routes/artistRoutes');
const albumRoutes = require('./routes/albumRoutes');
const trackRoutes = require('./routes/trackRoutes');
const playlistRoutes = require('./routes/playlistRoutes');

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Конфігурація Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Music Platform API',
            version: '1.0.0',
        },
        // Винесемо теги сюди, щоб Swagger знав про них заздалегідь
        tags: [
            { name: 'Albums', description: 'Операції з альбомами' },
            { name: 'Artists', description: 'Операції з виконавцями' },
            { name: 'Users', description: 'Користувачі та профілі' },
            { name: 'Auth', description: 'Авторизація' },
            { name: 'Tracks', description: 'Музичні треки' },
            { name: 'Playlists', description: 'Плейлисти' }
        ],
        components: {
            // Твої схеми (User, Artist, Album...), які ми обговорювали раніше
        }
    },
    apis: ['./routes/*.js', './app.js'], // або index.js
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Маршрути
app.get('/', (req, res) => res.send('Музична платформа API працює!'));
app.use('/api/users', userRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/playlists', playlistRoutes);

app.listen(port, () => {
    console.log(`✅ Сервер запущено: http://localhost:${port}`);
    console.log(`📖 Документація Swagger: http://localhost:${port}/api-docs`);
});