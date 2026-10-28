import { Router } from 'express';
import { db } from '../db/prisma.js';

const router = Router();

router.get('/', async (req, res) => {
  const isDbConnected = await db.checkConnection();
  const hasGroqKey = Boolean(process.env.GROQ_API_KEY && !process.env.GROQ_API_KEY.includes('replace_with'));

  return res.status(200).json({
    status: 'ok',
    service: 'Terminal Poltergeist API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    components: {
      database: isDbConnected ? 'connected' : 'in-memory-fallback',
      aiProvider: hasGroqKey ? 'configured' : 'deterministic-fallback',
    },
  });
});

export default router;
