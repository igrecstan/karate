import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import type { DataRepository } from '../types.js';

export function buildResourceRouter(repository: DataRepository): Router {
  const router = Router();

  router.get('/clubs', requireAuth, async (req, res) => {
    const page = Number(req.query.page ?? 1);
    const perPage = Number(req.query.per_page ?? 10);
    const { data, total } = await repository.listClubs(page, perPage);

    res.json({
      success: true,
      data,
      pagination: {
        page,
        per_page: perPage,
        total,
        total_pages: Math.ceil(total / perPage)
      }
    });
  });

  router.post('/clubs', requireAuth, async (req, res) => {
    const { name, manager, city, grade } = req.body as { name?: string; manager?: string; city?: string; grade?: string };
    if (!name || !manager) {
      res.status(400).json({ success: false, message: 'Nom du club et responsable requis' });
      return;
    }

    const club = await repository.createClub({ name, manager, city: city ?? 'Non précisé', grade: grade ?? 'Non précisé' });
    res.status(201).json({ success: true, data: club });
  });

  router.get('/messages', requireAuth, async (_req, res) => {
    res.json({ success: true, data: await repository.listMessages() });
  });

  router.put('/messages/:id', requireAuth, async (req, res) => {
    const id = Number(req.params.id);
    const ok = await repository.updateMessage(id, req.body);
    if (!ok) {
      res.status(404).json({ success: false, message: 'Message non trouvé' });
      return;
    }
    res.json({ success: true, message: 'Message mis à jour' });
  });

  router.delete('/messages/:id', requireAuth, async (req, res) => {
    const id = Number(req.params.id);
    const ok = await repository.deleteMessage(id);
    if (!ok) {
      res.status(404).json({ success: false, message: 'Message non trouvé' });
      return;
    }
    res.json({ success: true, message: 'Message supprimé' });
  });

  router.get('/events', requireAuth, async (_req, res) => {
    res.json({ success: true, data: await repository.listEvents() });
  });

  router.post('/events', requireAuth, async (req, res) => {
    const { name, date, location, description } = req.body as { name?: string; date?: string; location?: string; description?: string };
    if (!name || !date) {
      res.status(400).json({ success: false, message: 'Nom et date requis' });
      return;
    }
    const event = await repository.createEvent({ name, date, location, description });
    res.status(201).json({ success: true, data: event });
  });

  router.get('/documents', requireAuth, async (_req, res) => {
    res.json({ success: true, data: await repository.listDocuments() });
  });

  router.post('/documents', requireAuth, async (req, res) => {
    const { title, url, type } = req.body as { title?: string; url?: string; type?: string };
    if (!title || !url) {
      res.status(400).json({ success: false, message: 'Titre et URL requis' });
      return;
    }
    const document = await repository.createDocument({ title, url, type });
    res.status(201).json({ success: true, data: document });
  });

  return router;
}
