import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import authRoutes from './routes/auth.js';
import { buildResourceRouter } from './routes/resources.js';
import { getPool } from './db/postgres.js';
import { InMemoryRepository } from './repositories/inMemoryRepository.js';
import { PostgresRepository } from './repositories/postgresRepository.js';
import type { DataRepository } from './types.js';

const app = express();
const port = Number(process.env.PORT ?? 5000);

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

async function bootstrap(): Promise<void> {
  let repository: DataRepository = new InMemoryRepository();
  const pool = getPool();

  if (pool) {
    const postgresRepository = new PostgresRepository(pool);
    await postgresRepository.init();
    repository = postgresRepository;
    console.log('✅ Mode persistant PostgreSQL activé');
  } else {
    console.log('⚠️ DATABASE_URL absent: fallback en mémoire');
  }

  app.get('/health', (_req, res) => {
    res.json({
      status: 'ok',
      message: 'API TypeScript en ligne',
      storage: pool ? 'postgres' : 'memory'
    });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api', buildResourceRouter(repository));

  app.use((_req, res) => {
    res.status(404).json({ success: false, message: 'Route introuvable' });
  });

  app.listen(port, () => {
    console.log(`🚀 API TypeScript prête sur http://localhost:${port}`);
  });
}

bootstrap().catch((error) => {
  console.error('❌ Impossible de démarrer le serveur', error);
  process.exit(1);
});
