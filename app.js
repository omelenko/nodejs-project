const express = require("express");
require("dotenv").config();
const app = express();
const port = 3000;

// Імпорт УСІХ роутерів для основних таблиць
const userRoutes = require("./routes/userRoutes");
const artistRoutes = require("./routes/artistRoutes");
const albumRoutes = require("./routes/albumRoutes"); // <-- Додано
const trackRoutes = require("./routes/trackRoutes");
const playlistRoutes = require("./routes/playlistRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Музична платформа API працює!");
});

// Ендпоінти для кожної логічної сутності бази даних
app.use("/api/users", userRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/albums", albumRoutes); // <-- Додано
app.use("/api/tracks", trackRoutes);
app.use("/api/playlists", playlistRoutes);

app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`);
});
