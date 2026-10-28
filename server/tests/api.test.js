import request from 'supertest';
import { app } from '../src/app.js';

describe('Terminal Poltergeist Backend API Routes', () => {
  const testSessionId = 'test_sess_' + Date.now();

  describe('GET /api/health', () => {
    test('returns 200 with service status and components', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.service).toBe('Terminal Poltergeist API');
      expect(res.body.components).toBeDefined();
    });
  });

  describe('POST /api/analyze', () => {
    test('returns 400 when command is empty', async () => {
      const res = await request(app)
        .post('/api/analyze')
        .send({ command: '' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('ValidationError');
    });

    test('returns 400 when command exceeds size limit', async () => {
      const hugeCommand = 'echo ' + 'x'.repeat(2500);
      const res = await request(app)
        .post('/api/analyze')
        .send({ command: hugeCommand });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('ValidationError');
    });

    test('analyzes destructive command and returns structured result', async () => {
      const res = await request(app)
        .post('/api/analyze')
        .set('x-session-id', testSessionId)
        .send({ command: 'sudo rm -rf --no-preserve-root /' });

      expect(res.status).toBe(200);
      expect(res.body.riskLevel).toBe('Critical');
      expect(res.body.summary).toBeDefined();
      expect(res.body.consequences).toBeInstanceOf(Array);
      expect(res.body.matchedRules).toBeInstanceOf(Array);
      expect(res.body.matchedRules.length).toBeGreaterThan(0);
      expect(res.body.sessionId).toBe(testSessionId);
      expect(res.body.id).toBeDefined();
    });

    test('analyzes benign command and returns low risk', async () => {
      const res = await request(app)
        .post('/api/analyze')
        .set('x-session-id', testSessionId)
        .send({ command: 'git status' });

      expect(res.status).toBe(200);
      expect(res.body.riskLevel).toBe('Low');
      expect(res.body.matchedRules.length).toBe(0);
    });
  });

  describe('History Endpoints (/api/history)', () => {
    let createdRecordId;

    beforeAll(async () => {
      const analyzeRes = await request(app)
        .post('/api/analyze')
        .set('x-session-id', testSessionId)
        .send({ command: 'chmod -R 777 /var/www' });

      createdRecordId = analyzeRes.body.id;
    });

    test('GET /api/history returns session history', async () => {
      const res = await request(app)
        .get(`/api/history?sessionId=${testSessionId}`)
        .set('x-session-id', testSessionId);

      expect(res.status).toBe(200);
      expect(res.body.history).toBeInstanceOf(Array);
      expect(res.body.history.length).toBeGreaterThan(0);
      expect(res.body.sessionId).toBe(testSessionId);
    });

    test('GET /api/history/:id returns specific analysis', async () => {
      const res = await request(app)
        .get(`/api/history/${createdRecordId}`)
        .set('x-session-id', testSessionId);

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(createdRecordId);
      expect(res.body.command).toBe('chmod -R 777 /var/www');
    });

    test('DELETE /api/history/:id deletes specific item', async () => {
      const res = await request(app)
        .delete(`/api/history/${createdRecordId}`)
        .set('x-session-id', testSessionId);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    test('DELETE /api/history clears entire session history', async () => {
      const res = await request(app)
        .delete(`/api/history?sessionId=${testSessionId}`)
        .set('x-session-id', testSessionId);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const checkRes = await request(app)
        .get(`/api/history?sessionId=${testSessionId}`)
        .set('x-session-id', testSessionId);

      expect(checkRes.body.history.length).toBe(0);
    });
  });
});
