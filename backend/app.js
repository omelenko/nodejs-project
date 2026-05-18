const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();

app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use(express.json());

const port = process.env.PORT || 3000;

// Імпорт роутерів
const userRoutes = require('./routes/userRoutes');
const artistRoutes = require('./routes/artistRoutes');
const albumRoutes = require('./routes/albumRoutes');
const trackRoutes = require('./routes/trackRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const searchRoutes = require('./routes/searchRoutes'); // Додано пошук



// Конфігурація Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Music Platform API',
      version: '1.0.0',
    },
    tags: [
      { name: 'Albums', description: 'Операції з альбомами' },
      { name: 'Artists', description: 'Операції з виконавцями' },
      { name: 'Users', description: 'Користувачі та профілі' },
      { name: 'Auth', description: 'Авторизація' },
      { name: 'Tracks', description: 'Музичні треки' },
      { name: 'Playlists', description: 'Плейлисти' },
      { name: 'Search', description: 'Глобальний пошук по всій платформі' }, // Додано тег
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Введіть ваш JWT токен у форматі: Bearer <токен>',
        }
      },
      schemas: {
        // Повна схема артиста
        Artist: {
          type: 'object',
          required: ['stageName'],
          properties: {
            id: { type: 'integer', example: 4 },
            stageName: { type: 'string', example: 'Luna Rivers' },
            firstName: { type: 'string', example: 'Марія' },
            lastName: { type: 'string', example: 'Ковальчук' },
            bio: { type: 'string', example: 'Indie pop artist from Ukraine' },
            country: { type: 'string', example: 'Ukraine' },
            avatarUrl: { type: 'string', example: 'https://example.com/avatar.jpg' },
            bannerUrl: { type: 'string', example: 'https://example.com/banner.jpg' },
            userId: { type: 'integer', example: 42 },
          },
        },
        // Мінімальна схема артиста (для вкладених об'єктів в альбомах/треках)
        ArtistMinimal: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 4 },
            name: { type: 'string', example: 'Luna Rivers' },
          },
        },
        // Мінімальна схема треку
        TrackMinimal: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 102 },
            title: { type: 'string', example: 'Midnight Dreams' },
            duration: { type: 'string', example: '4:05' },
          },
        },
        // Базова схема альбому
        Album: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'Nocturnal Sessions' },
            coverUrl: { type: 'string', example: 'https://placehold.co/400x400' },
            releaseYear: { type: 'integer', example: 2024 },
            artists: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  artist: {
                    $ref: '#/components/schemas/ArtistMinimal',
                  },
                },
              },
            },
          },
        },
        Playlists: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            name: {
              type: 'string',
              example: "My Fav Chill Beats",
              creatorId: {
                type: 'integer',
                example: 42,
              }
            },
            creator: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                  example: "johndoe"
                }
              }
            },
          },
        },
        PlaylistTrack: {
          type: 'object',
          properties: {
            playlistId: {
              type: 'integer',
              example: 1,
          },
          trackId: {
              type: 'integer',
              example: 102
            },
          },
        },
        // Повна схема треку (Додано з trackRoutes)
        TrackFull: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 102 },
            title: { type: 'string', example: 'Midnight Dreams' },
            genre: { type: 'string', example: 'Synthwave' },
            duration: { type: 'string', example: '4:05' },
            fileUrl: { type: 'string', example: 'https://example.com/storage/track102.mp3' },
            albumId: { type: 'integer', nullable: true, example: 1 },
            artists: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  artist: {
                    $ref: '#/components/schemas/ArtistMinimal',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js', './app.js'],
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
app.use('/api/search', searchRoutes); // Реєстрація роута пошуку

app.listen(port, () => {
  console.log(`✅ Сервер запущено: http://localhost:${port}`);
  console.log(`📖 Документація Swagger: http://localhost:${port}/api-docs`);
});
