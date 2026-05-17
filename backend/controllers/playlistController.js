const prisma = require('../prismaClient');


exports.getById = async (req, res) => {
  try {
    const playlist = await prisma.playlist.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        tracks: {
          include: { track: true } // Дістаємо треки через PlaylistTrack
        },
        creator: { select: { username: true } } // Інфо про творця
      }
    });
    if (!playlist) return res.status(404).json({ message: "Плейлист не знайдено" });
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    const newPlaylist = await prisma.playlist.create({
      data: {
        name,
        creatorId: userId
      }
    });
    res.status(201).json(newPlaylist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await prisma.playlist.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Додати трек до плейлиста (запис у проміжну таблицю PlaylistTrack)
exports.addTrackToPlaylist = async (req, res) => {
  try {
    const playlistId = parseInt(req.params.id);
    const { trackId } = req.body;

    const link = await prisma.playlistTrack.create({
      data: {
        playlistId,
        trackId: parseInt(trackId)
      }
    });
    res.status(201).json({ message: "Трек додано до плейлиста", link });
  } catch (error) {
    res.status(400).json({ error: "Не вдалося додати трек (можливо, він вже є в плейлисти)" });
  }
};

// Видалити трек із плейлиста
exports.removeTrackFromPlaylist = async (req, res) => {
  try {
    const playlistId = parseInt(req.params.id);
    const trackId = parseInt(req.params.trackId);

    await prisma.playlistTrack.delete({
      where: {
        playlistId_trackId: { playlistId, trackId } // Складовий первинний ключ з вашої схеми @@id([playlistId, trackId])
      }
    });
    res.json({ message: "Трек видалено з плейлиста" });
  } catch (error) {
    res.status(404).json({ error: "Зв'язок не знайдено" });
  }
};