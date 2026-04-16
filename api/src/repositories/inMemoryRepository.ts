import { seedClubs, seedDocuments, seedEvents, seedMessages } from '../seed/defaultData.js';
import type { ClubItem, DataRepository, DocumentItem, EventItem, MessageItem } from '../types.js';

export class InMemoryRepository implements DataRepository {
  private clubs = [...seedClubs];
  private messages = [...seedMessages];
  private events = [...seedEvents];
  private documents = [...seedDocuments];

  private counters = {
    club: this.clubs.length + 1,
    event: this.events.length + 1,
    document: this.documents.length + 1
  };

  async listClubs(page: number, perPage: number): Promise<{ data: ClubItem[]; total: number }> {
    const start = (page - 1) * perPage;
    return { data: this.clubs.slice(start, start + perPage), total: this.clubs.length };
  }

  async createClub(payload: Omit<ClubItem, 'id'>): Promise<ClubItem> {
    const club = { id: this.counters.club++, ...payload };
    this.clubs.push(club);
    return club;
  }

  async listMessages(): Promise<MessageItem[]> { return this.messages; }

  async updateMessage(id: number, payload: Partial<MessageItem>): Promise<boolean> {
    const item = this.messages.find((message) => message.id === id);
    if (!item) return false;
    Object.assign(item, payload);
    return true;
  }

  async deleteMessage(id: number): Promise<boolean> {
    const index = this.messages.findIndex((message) => message.id === id);
    if (index < 0) return false;
    this.messages.splice(index, 1);
    return true;
  }

  async listEvents(): Promise<EventItem[]> { return this.events; }

  async createEvent(payload: Omit<EventItem, 'id' | 'createdAt'>): Promise<EventItem> {
    const event = { id: this.counters.event++, ...payload, createdAt: new Date().toISOString() };
    this.events.push(event);
    return event;
  }

  async listDocuments(): Promise<DocumentItem[]> { return this.documents; }

  async createDocument(payload: Omit<DocumentItem, 'id' | 'createdAt'>): Promise<DocumentItem> {
    const document = { id: this.counters.document++, ...payload, createdAt: new Date().toISOString() };
    this.documents.push(document);
    return document;
  }
}
