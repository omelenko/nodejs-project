import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const TrackController = {
  // GET: Отримати всі треки (з іменами виконавців)
  async getAll(req: Request, res: Response) {
    try {
      const tracks = await prisma.track.findMany({
        include: {
          artists: {
            include: { artist: { select: { stageName: true } } },
          },
          album: { select: { title: true } },
        },
      });
      res.json(tracks);
    } catch (error) {
      res.status(500).json({ error: "Не вдалося завантажити треки" });
    }
  },

  // GET: Отримати один трек за ID
  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const track = await prisma.track.findUnique({
        where: { id: Number(id) },
        include: {
          artists: { include: { artist: true } },
          album: true,
        },
      });
      if (!track) return res.status(404).json({ message: "Трек не знайдено" });
      res.json(track);
    } catch (error) {
      res.status(500).json({ error: "Помилка сервера" });
    }
  },

  // POST: Створити трек та прив'язати його до артиста
  async create(req: Request, res: Response) {
    const { title, genre, duration, fileUrl, albumId, artistIds } = req.body;

    try {
      // Створюємо трек і одночасно записи в проміжній таблиці ArtistTrack
      const newTrack = await prisma.track.create({
        data: {
          title,
          genre,
          duration,
          fileUrl,
          albumId: albumId ? Number(albumId) : null,
          artists: {
            create: artistIds.map((id: number) => ({
              artist: { connect: { id: Number(id) } },
            })),
          },
        },
        include: { artists: true },
      });
      res.status(201).json(newTrack);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Помилка при створенні треку" });
    }
  },

  // DELETE: Видалити трек
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      // Завдяки каскадному видаленню (якщо воно налаштоване)
      // або ручному видаленню зв'язків
      await prisma.track.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Не вдалося видалити трек" });
    }
  },
};
