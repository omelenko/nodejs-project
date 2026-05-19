const express = require('express');
const app = express();

// Обов'язково для того, щоб Express міг читати JSON-тіло (req.body) у POST-запитах
app.use(express.json());

// Імпортуємо твої оригінальні маршрути (шляхи ведуть до твоєї папки routes)
const userRoutes = require('../routes/userRoutes');
const trackRoutes = require('../routes/trackRoutes');
const albumRoutes = require('../routes/albumRoutes');
const artistRoutes = require('../routes/artistRoutes');
const playlistRoutes = require('../routes/playlistRoutes');
const searchRoutes = require('../routes/searchRoutes');

// Підключаємо маршрути з правильними префіксами, як у твоєму проекті
app.use('/api/users', userRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/search', searchRoutes);

module.exports = app;
