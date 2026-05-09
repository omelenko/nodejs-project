import express from "express";
import artistRoutes from "./routes/artist.routes";
import trackRoutes from "./routes/track.routes";
import userRoutes from "./routes/user.routes";
import albumRoutes from "./routes/album.routes";
import playlistRoutes from "./routes/playlist.routes";
import favouriteRoutes from "./routes/favourite.routes";
import "dotenv/config";

const app = express();
app.use(express.json()); // Обов'язково для обробки JSON у запитах

// Реєстрація роутерів
app.use("/api/users", userRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/tracks", trackRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/favourites", favouriteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
