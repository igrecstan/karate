import type { ClubItem, DocumentItem, EventItem, MessageItem } from '../types.js';

export const seedClubs: ClubItem[] = [
  { id: 1, name: 'Abidjan Karaté Club', manager: 'Kouassi Jean', city: 'Abidjan', grade: '5e Dan' },
  { id: 2, name: 'Yamoussoukro Budo', manager: 'Marie Touré', city: 'Yamoussoukro', grade: '3e Dan' },
  { id: 3, name: 'Bouaké Shotokan', manager: 'Paul Bamba', city: 'Bouaké', grade: '4e Dan' }
];

export const seedMessages: MessageItem[] = [
  { id: 1, name: 'Abidjan Karaté Club', email: 'contact@akc.ci', date: '2026-04-10', message: 'Informations sur la procédure d\'adhésion.', read: false },
  { id: 2, name: 'Marie Touré', email: 'm.toure@gmail.com', date: '2026-04-09', message: 'Organisation d\'un stage interclubs en juin.', read: false }
];

export const seedEvents: EventItem[] = [
  { id: 1, name: 'Championnat national', date: '2026-05-30', location: 'Abidjan', description: 'Compétition senior', createdAt: new Date().toISOString() }
];

export const seedDocuments: DocumentItem[] = [
  { id: 1, title: 'Règlement sportif 2026', url: '/docs/reglement-2026.pdf', type: 'pdf', createdAt: new Date().toISOString() }
];
