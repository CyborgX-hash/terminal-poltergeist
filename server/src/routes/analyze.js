import { Router } from 'express';
import { analyzeCommandWithAI } from '../services/ai.js';
import { db } from '../db/prisma.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { command, sessionId } = req.body;
    const clientSessionId = req.headers['x-session-id'] || sessionId || 'anonymous';

    if (!command || typeof command !== 'string' || !command.trim()) {
      return res.status(400).json({
        error: 'ValidationError',
        message: 'A non-empty shell command string is required.',
      });
    }

    if (command.length > 2048) {
      return res.status(400).json({
        error: 'ValidationError',
        message: 'Command exceeds the maximum limit of 2048 characters.',
      });
    }

    // Run AI & deterministic analysis
    const analysis = await analyzeCommandWithAI(command);

    // Save to persistent database / session store
    const saved = await db.saveAnalysis({
      ...analysis,
      sessionId: clientSessionId,
    });

    return res.status(200).json({
      ...analysis,
      id: saved.id,
      sessionId: clientSessionId,
      createdAt: saved.createdAt,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
