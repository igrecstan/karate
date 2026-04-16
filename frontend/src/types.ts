export interface Club {
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
}

export interface DocumentItem {
  id: number;
  title: string;
  url: string;
  type?: string;
}
