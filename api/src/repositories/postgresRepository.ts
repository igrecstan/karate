import type { Pool } from 'pg';
import { seedClubs, seedDocuments, seedEvents, seedMessages } from '../seed/defaultData.js';
import type { ClubItem, DataRepository, DocumentItem, EventItem, MessageItem } from '../types.js';

export class PostgresRepository implements DataRepository {
  constructor(private readonly pool: Pool) {}

  async init(): Promise<void> {
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS clubs (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        manager TEXT NOT NULL,
        city TEXT NOT NULL,
        grade TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        date DATE NOT NULL,
        message TEXT NOT NULL,
        read BOOLEAN NOT NULL DEFAULT FALSE
      );
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        date DATE NOT NULL,
        location TEXT,
        description TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        type TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    await this.seedIfEmpty();
  }

  private async seedIfEmpty(): Promise<void> {
    const clubCount = await this.pool.query<{ count: string }>('SELECT COUNT(*) FROM clubs');
    if (Number(clubCount.rows[0].count) > 0) return;

    for (const item of seedClubs) {
      await this.pool.query('INSERT INTO clubs (name, manager, city, grade) VALUES ($1,$2,$3,$4)', [item.name, item.manager, item.city, item.grade]);
    }
    for (const item of seedMessages) {
      await this.pool.query('INSERT INTO messages (name, email, date, message, read) VALUES ($1,$2,$3,$4,$5)', [item.name, item.email, item.date, item.message, item.read]);
    }
    for (const item of seedEvents) {
      await this.pool.query('INSERT INTO events (name, date, location, description, created_at) VALUES ($1,$2,$3,$4,$5)', [item.name, item.date, item.location ?? null, item.description ?? null, item.createdAt]);
    }
    for (const item of seedDocuments) {
      await this.pool.query('INSERT INTO documents (title, url, type, created_at) VALUES ($1,$2,$3,$4)', [item.title, item.url, item.type ?? null, item.createdAt]);
    }
  }

  async listClubs(page: number, perPage: number): Promise<{ data: ClubItem[]; total: number }> {
    const offset = (page - 1) * perPage;
    const totalResult = await this.pool.query<{ count: string }>('SELECT COUNT(*) FROM clubs');
    const rows = await this.pool.query<ClubItem>('SELECT id, name, manager, city, grade FROM clubs ORDER BY id LIMIT $1 OFFSET $2', [perPage, offset]);
    return { data: rows.rows, total: Number(totalResult.rows[0].count) };
  }

  async createClub(payload: Omit<ClubItem, 'id'>): Promise<ClubItem> {
    const { rows } = await this.pool.query<ClubItem>('INSERT INTO clubs (name, manager, city, grade) VALUES ($1,$2,$3,$4) RETURNING id, name, manager, city, grade', [payload.name, payload.manager, payload.city, payload.grade]);
    return rows[0];
  }

  async listMessages(): Promise<MessageItem[]> {
    const { rows } = await this.pool.query<{ id: number; name: string; email: string; date: string; message: string; read: boolean }>("SELECT id, name, email, TO_CHAR(date, 'YYYY-MM-DD') as date, message, read FROM messages ORDER BY id DESC");
    return rows;
  }

  async updateMessage(id: number, payload: Partial<MessageItem>): Promise<boolean> {
    const { rows } = await this.pool.query<{ id: number }>('UPDATE messages SET read = COALESCE($1, read) WHERE id = $2 RETURNING id', [payload.read, id]);
    return rows.length > 0;
  }

  async deleteMessage(id: number): Promise<boolean> {
    const deleted = await this.pool.query('DELETE FROM messages WHERE id = $1', [id]);
    return deleted.rowCount > 0;
  }

  async listEvents(): Promise<EventItem[]> {
    const { rows } = await this.pool.query<{ id: number; name: string; date: string; location: string | null; description: string | null; createdAt: string }>("SELECT id, name, TO_CHAR(date, 'YYYY-MM-DD') as date, location, description, created_at as \"createdAt\" FROM events ORDER BY date DESC");
    return rows.map((row) => ({ ...row, location: row.location ?? undefined, description: row.description ?? undefined }));
  }

  async createEvent(payload: Omit<EventItem, 'id' | 'createdAt'>): Promise<EventItem> {
    const { rows } = await this.pool.query<EventItem>("INSERT INTO events (name, date, location, description) VALUES ($1,$2,$3,$4) RETURNING id, name, TO_CHAR(date, 'YYYY-MM-DD') as date, location, description, created_at as \"createdAt\"", [payload.name, payload.date, payload.location ?? null, payload.description ?? null]);
    return rows[0];
  }

  async listDocuments(): Promise<DocumentItem[]> {
    const { rows } = await this.pool.query<DocumentItem>('SELECT id, title, url, type, created_at as \"createdAt\" FROM documents ORDER BY id DESC');
    return rows;
  }

  async createDocument(payload: Omit<DocumentItem, 'id' | 'createdAt'>): Promise<DocumentItem> {
    const { rows } = await this.pool.query<DocumentItem>('INSERT INTO documents (title, url, type) VALUES ($1,$2,$3) RETURNING id, title, url, type, created_at as \"createdAt\"', [payload.title, payload.url, payload.type ?? null]);
    return rows[0];
  }
}
