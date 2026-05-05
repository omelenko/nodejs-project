const prisma = require("../prismaClient");

// Отримати всіх користувачів
exports.getAll = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, email: true, createdAt: true },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Отримати одного користувача за ID разом з його плейлистами
exports.getById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { playlists: true },
    });
    if (!user)
      return res.status(404).json({ message: "Користувача не знайдено" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Створити користувача (базовий CRUD, без хешування для демонстрації)
exports.create = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await prisma.user.create({
      data: { username, email, password },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Додати трек в улюблені (Реалізація логіки таблиці Favourite)
exports.addFavorite = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { trackId } = req.body;

    const favorite = await prisma.favourite.create({
      data: { userId, trackId },
    });
    res.status(201).json({ message: "Трек додано в улюблені", favorite });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
