import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';
import path from 'path';

// Примусове завантаження .env з поточної папки
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default defineConfig({
  datasource: {
    // Тепер ми впевнені, що URL буде взято з .env
    url: process.env.DATABASE_URL,
  },
});
