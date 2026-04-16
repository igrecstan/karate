import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { requireAuth, signToken } from '../middleware/auth.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-me';

router.post('/login', (req, res) => {
  const { username, password } = req.body as { username?: string; password?: string };

  if (username === 'admin' && password === 'admin123') {
    const token = signToken({ username, role: 'admin' });
    res.json({ success: true, token, user: { username, role: 'admin' } });
    return;
  }

  res.status(401).json({ success: false, message: 'Identifiants invalides' });
});

router.get('/verify', requireAuth, (req, res) => {
  const token = req.header('authorization')?.replace('Bearer ', '');
  const user = token ? jwt.verify(token, JWT_SECRET) : null;
  res.json({ success: true, user });
});

export default router;
