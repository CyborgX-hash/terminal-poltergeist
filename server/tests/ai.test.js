import { analyzeCommandWithAI } from '../src/services/ai.js';

describe('Groq AI Service & Guardrail Integration', () => {
  const originalKey = process.env.GROQ_API_KEY;

  beforeEach(() => {
    delete process.env.GROQ_API_KEY;
  });

  afterAll(() => {
    process.env.GROQ_API_KEY = originalKey;
  });

  test('rejects empty command input', async () => {
    await expect(analyzeCommandWithAI('')).rejects.toThrow('Command must be a non-empty string');
    await expect(analyzeCommandWithAI(null)).rejects.toThrow('Command must be a non-empty string');
  });

  test('rejects commands exceeding character threshold', async () => {
    const hugeCmd = 'echo ' + 'a'.repeat(2500);
    await expect(analyzeCommandWithAI(hugeCmd)).rejects.toThrow('Command exceeds maximum allowed length');
  });

  test('seamlessly provides deterministic analysis when GROQ_API_KEY is not set', async () => {
    const res = await analyzeCommandWithAI('sudo rm -rf --no-preserve-root /');
    expect(res.isValid).toBe(true);
    expect(res.riskLevel).toBe('Critical');
    expect(res.isDeterministicOnly).toBe(true);
    expect(res.matchedRules.length).toBeGreaterThan(0);
    expect(res.modelMetadata.provider).toBe('Deterministic Rule Engine');
  });

  test('returns safe report for standard command in offline mode', async () => {
    const res = await analyzeCommandWithAI('ls -la /home/user');
    expect(res.isValid).toBe(true);
    expect(res.riskLevel).toBe('Low');
    expect(res.isDeterministicOnly).toBe(true);
  });
});
