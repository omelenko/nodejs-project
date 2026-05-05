// prismaClient.js
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

// 1. Створюємо пул з'єднань через стандартний драйвер PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Огортаємо його в адаптер, який вимагає Prisma 7
const adapter = new PrismaPg(pool);

// 3. Передаємо адаптер у конструктор клієнта
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
