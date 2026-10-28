import { Router } from 'express';
import { db } from '../db/prisma.js';

const router = Router();

// GET /api/history — Retrieve session history with pagination
router.get('/', async (req, res, next) => {
  try {
    const sessionId = req.headers['x-session-id'] || req.query.sessionId || 'anonymous';
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 50, 1), 100);
    const offset = Math.max(parseInt(req.query.offset, 10) || 0, 0);

    const history = await db.getHistory(sessionId, limit, offset);

    return res.status(200).json({
      history,
      total: history.length,
      limit,
      offset,
      sessionId,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/history/:id — Retrieve specific analysis
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const sessionId = req.headers['x-session-id'] || req.query.sessionId || null;

    const record = await db.getAnalysisById(id, sessionId);
    if (!record) {
      return res.status(404).json({
        error: 'NotFound',
        message: 'No analysis record found with the given ID.',
      });
    }

    return res.status(200).json(record);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/history/:id — Delete single record
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const sessionId = req.headers['x-session-id'] || req.query.sessionId || null;

    const deleted = await db.deleteAnalysisById(id, sessionId);
    return res.status(200).json({
      success: true,
      id,
      deleted,
      message: 'Analysis record deleted.',
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/history — Clear all records for session
router.delete('/', async (req, res, next) => {
  try {
    const sessionId = req.headers['x-session-id'] || req.query.sessionId || 'anonymous';

    await db.clearHistory(sessionId);
    return res.status(200).json({
      success: true,
      sessionId,
      message: 'Session history successfully purged.',
    });
  } catch (err) {
    next(err);
  }
});

export default router;
