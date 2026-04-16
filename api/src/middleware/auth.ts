import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-me';

export interface AuthenticatedRequest extends Request {
  user?: { username: string; role: 'admin' };
}

export function signToken(payload: { username: string; role: 'admin' }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const header = req.header('authorization');
  const token = header?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ success: false, message: 'Token manquant' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string; role: 'admin' };
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Token invalide ou expiré' });
  }
}
