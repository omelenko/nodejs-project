const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Отримати список усіх збережених треків користувача
exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorites = await prisma.favourite.findMany({
      where: { userId },
      include: { track: true },
      orderBy: { addedAt: 'desc' }, // Спочатку нові лайки
    });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Додати трек в улюблене (Лайк)
exports.likeTrack = async (req, res) => {
  try {
    const userId = req.user.id;
    const { trackId } = req.body;

    const favorite = await prisma.favourite.create({
      data: {
        userId,
        trackId: parseInt(trackId),
      },
    });
    res.status(201).json({ message: 'Додано в улюблене', favorite });
  } catch {
    res.status(400).json({ error: 'Цей трек вже у ваших улюблених' });
  }
};

// Видалити трек з улюбленого (Дизлайк)
exports.unlikeTrack = async (req, res) => {
  try {
    const userId = req.user.id;
    const trackId = parseInt(req.params.trackId);

    await prisma.favourite.delete({
      where: {
        userId_trackId: { userId, trackId }, // Завдяки унікальному індексу @@unique([userId, trackId])
      },
    });
    res.json({ message: 'Видалено з улюбленого' });
  } catch {
    res.status(404).json({ error: 'Трек не знайдено в списку улюблених' });
  }
};
