export interface ClubItem {
  id: number;
  name: string;
  manager: string;
  city: string;
  grade: string;
}

export interface MessageItem {
  id: number;
  name: string;
  email: string;
  date: string;
  message: string;
  read: boolean;
}

export interface EventItem {
  id: number;
  name: string;
  date: string;
  location?: string;
  description?: string;
  createdAt: string;
}

export interface DocumentItem {
  id: number;
  title: string;
  url: string;
  type?: string;
  createdAt: string;
}

export interface DataRepository {
  listClubs(page: number, perPage: number): Promise<{ data: ClubItem[]; total: number }>;
  createClub(payload: Omit<ClubItem, 'id'>): Promise<ClubItem>;
  listMessages(): Promise<MessageItem[]>;
  updateMessage(id: number, payload: Partial<MessageItem>): Promise<boolean>;
  deleteMessage(id: number): Promise<boolean>;
  listEvents(): Promise<EventItem[]>;
  createEvent(payload: Omit<EventItem, 'id' | 'createdAt'>): Promise<EventItem>;
  listDocuments(): Promise<DocumentItem[]>;
  createDocument(payload: Omit<DocumentItem, 'id' | 'createdAt'>): Promise<DocumentItem>;
  init?(): Promise<void>;
}
