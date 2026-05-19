const request = require('supertest');
const app = require('./testApp');
const prisma = require('../prismaClient');
const bcrypt = require('bcryptjs');

describe('User Authentication API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/users/register', () => {
    it('should successfully register a new user', async () => {
      // Імітуємо, що користувача з таким email/username немає
      prisma.user.findFirst.mockResolvedValue(null);
      // Імітуємо успішне створення в БД
      prisma.user.create.mockResolvedValue({
        id: 1,
        username: 'testuser',
        email: 'test@test.com',
      });

      const res = await request(app).post('/api/users/register').send({
        username: 'testuser',
        email: 'test@test.com',
        password: 'password123',
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
      expect(res.body.username).toBe('testuser');
    });

    it('should fail if email or username already exists', async () => {
      // Імітуємо, що користувач вже існує
      prisma.user.findFirst.mockResolvedValue({
        id: 2,
        email: 'test@test.com',
      });

      const res = await request(app).post('/api/users/register').send({
        username: 'testuser',
        email: 'test@test.com',
        password: 'password123',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Email або Username вже зайняті');
    });

    it('should return 500 on register error', async () => {
      prisma.user.findFirst.mockResolvedValue(null);
      prisma.user.create.mockRejectedValue(new Error('DB Error'));

      const res = await request(app).post('/api/users/register').send({
        username: 'testuser',
        email: 'test@test.com',
        password: 'password123',
      });

      expect(res.statusCode).toBe(500);
    });
  });

  describe('POST /api/users/login', () => {
    it('should login and return a JWT token', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);

      prisma.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'test@test.com',
        password: hashedPassword,
      });

      const res = await request(app)
        .post('/api/users/login')
        .send({ email: 'test@test.com', password: 'password123' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe('test@test.com');
    });

    it('should return 401 for non-existing user', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/users/login')
        .send({ email: 'wrong@test.com', password: 'password123' });

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe('Користувача не знайдено');
    });

    it('should return 401 for wrong password', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);

      prisma.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'test@test.com',
        password: hashedPassword,
      });

      const res = await request(app)
        .post('/api/users/login')
        .send({ email: 'test@test.com', password: 'wrongpassword' });

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe('Неправильний пароль');
    });

    it('should return 500 on login error', async () => {
      prisma.user.findUnique.mockRejectedValue(new Error('DB Error'));

      const res = await request(app)
        .post('/api/users/login')
        .send({ email: 'test@test.com', password: 'password123' });

      expect(res.statusCode).toBe(500);
    });
  });
});
