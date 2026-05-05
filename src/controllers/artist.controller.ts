import { Request, Response } from 'express';
import prisma from '../lib/prisma'; // шлях до твого prisma client

export const ArtistController = {
  // GET: Отримати всіх виконавців
  async getAll(req: Request, res: Response) {
    try {
      const artists = await prisma.artist.findMany({
        include: { _count: { select: { tracks: true, albums: true } } }
      });
      res.json(artists);
    } catch (error) {
      res.status(500).json({ error: 'Помилка при отриманні списку виконавців' });
    }
  },

  // GET: Отримати одного виконавця за ID
  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const artist = await prisma.artist.findUnique({
        where: { id: Number(id) },
        include: {
          albums: { include: { album: true } },
          tracks: { include: { track: true } }
        }
      });
      if (!artist) return res.status(404).json({ message: 'Виконавця не знайдено' });
      res.json(artist);
    } catch (error) {
      res.status(500).json({ error: 'Помилка сервера' });
    }
  },

  // POST: Створити нового виконавця
  async create(req: Request, res: Response) {
    const { stageName, firstName, lastName, bio, country } = req.body;
    try {
      const newArtist = await prisma.artist.create({
        data: {
          stageName,
          firstName,
          lastName,
          bio,
          country
        }
      });
      res.status(201).json(newArtist);
    } catch (error) {
      res.status(400).json({ error: 'Не вдалося створити виконавця. Можливо, псевдонім уже зайнятий' });
    }
  },

  // DELETE: Видалити виконавця
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.artist.delete({
        where: { id: Number(id) }
      });
      res.status(204).send(); // Успішно видалено, без тіла відповіді
    } catch (error) {
      res.status(400).json({ error: 'Не вдалося видалити виконавця. Перевірте, чи існують пов’язані дані' });
    }
  }
};