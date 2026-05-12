const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

// 1. Створюємо пул підключень через стандартний драйвер 'pg'
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 2. Створюємо адаптер, який Prisma 7 розуміє
const adapter = new PrismaPg(pool);

// 3. Передаємо адаптер у конструктор (тепер це легально)
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
