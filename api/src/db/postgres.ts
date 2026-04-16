import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

export function getPool(): Pool | null {
  if (!connectionString) return null;
  return new Pool({ connectionString });
}
