import { PrismaClient } from '@prisma/client';

let prismaInstance = null;
let isConnected = false;
const inMemoryStore = [];

function getPrismaClient() {
  if (!prismaInstance) {
    if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgresql://')) {
      try {
        prismaInstance = new PrismaClient({
          log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
        });
      } catch (err) {
        console.warn('[Database] Prisma initialization error:', err.message);
      }
    }
  }
  return prismaInstance;
}

export const db = {
  async checkConnection() {
    const client = getPrismaClient();
    if (!client) {
      return false;
    }
    try {
      await client.$queryRaw`SELECT 1`;
      isConnected = true;
      return true;
    } catch (err) {
      console.warn('[Database] PostgreSQL connection check warning:', err.message);
      isConnected = false;
      return false;
    }
  },

  async saveAnalysis(data) {
    const client = getPrismaClient();
    if (client && isConnected) {
      try {
        const record = await client.commandAnalysis.create({
          data: {
            sessionId: data.sessionId || 'anonymous',
            command: data.command,
            riskLevel: data.riskLevel || 'Low',
            summary: data.summary || 'Command inspected',
            ghostCommentary: data.ghostCommentary || null,
            saferAlternative: data.saferAlternative || null,
            components: data.components ? JSON.stringify(data.components) : null,
            consequences: data.consequences ? JSON.stringify(data.consequences) : null,
            affectedResources: data.affectedResources ? JSON.stringify(data.affectedResources) : null,
            reasons: data.reasons ? JSON.stringify(data.reasons) : null,
            matchedRules: data.matchedRules ? JSON.stringify(data.matchedRules) : null,
            modelMetadata: data.modelMetadata ? JSON.stringify(data.modelMetadata) : null,
            isDeterministicOnly: Boolean(data.isDeterministicOnly),
          },
        });
        return {
          ...record,
          components: data.components,
          consequences: data.consequences,
          affectedResources: data.affectedResources,
          reasons: data.reasons,
          matchedRules: data.matchedRules,
          modelMetadata: data.modelMetadata,
        };
      } catch (err) {
        console.warn('[Database] Failed to write analysis to PostgreSQL, saving to in-memory fallback:', err.message);
      }
    }

    // Fallback storage
    const fallbackRecord = {
      id: 'mem_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8),
      sessionId: data.sessionId || 'anonymous',
      command: data.command,
      riskLevel: data.riskLevel || 'Low',
      summary: data.summary || 'Command inspected',
      ghostCommentary: data.ghostCommentary || null,
      saferAlternative: data.saferAlternative || null,
      components: data.components || [],
      consequences: data.consequences || [],
      affectedResources: data.affectedResources || [],
      reasons: data.reasons || [],
      matchedRules: data.matchedRules || [],
      modelMetadata: data.modelMetadata || {},
      isDeterministicOnly: Boolean(data.isDeterministicOnly),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    inMemoryStore.unshift(fallbackRecord);
    return fallbackRecord;
  },

  async getHistory(sessionId = 'anonymous', limit = 50, offset = 0) {
    const client = getPrismaClient();
    if (client && isConnected) {
      try {
        const records = await client.commandAnalysis.findMany({
          where: { sessionId },
          orderBy: { createdAt: 'desc' },
          take: limit,
          skip: offset,
        });

        return records.map((r) => ({
          ...r,
          components: typeof r.components === 'string' ? JSON.parse(r.components) : r.components,
          consequences: typeof r.consequences === 'string' ? JSON.parse(r.consequences) : r.consequences,
          affectedResources: typeof r.affectedResources === 'string' ? JSON.parse(r.affectedResources) : r.affectedResources,
          reasons: typeof r.reasons === 'string' ? JSON.parse(r.reasons) : r.reasons,
          matchedRules: typeof r.matchedRules === 'string' ? JSON.parse(r.matchedRules) : r.matchedRules,
          modelMetadata: typeof r.modelMetadata === 'string' ? JSON.parse(r.modelMetadata) : r.modelMetadata,
        }));
      } catch (err) {
        console.warn('[Database] Failed to query PostgreSQL history, using in-memory store:', err.message);
      }
    }

    // Fallback store
    return inMemoryStore
      .filter((r) => r.sessionId === sessionId)
      .slice(offset, offset + limit);
  },

  async getAnalysisById(id, sessionId = null) {
    const client = getPrismaClient();
    if (client && isConnected) {
      try {
        const query = { id };
        if (sessionId) query.sessionId = sessionId;
        const record = await client.commandAnalysis.findFirst({ where: query });
        if (record) {
          return {
            ...record,
            components: typeof record.components === 'string' ? JSON.parse(record.components) : record.components,
            consequences: typeof record.consequences === 'string' ? JSON.parse(record.consequences) : record.consequences,
            affectedResources: typeof record.affectedResources === 'string' ? JSON.parse(record.affectedResources) : record.affectedResources,
            reasons: typeof record.reasons === 'string' ? JSON.parse(record.reasons) : record.reasons,
            matchedRules: typeof record.matchedRules === 'string' ? JSON.parse(record.matchedRules) : record.matchedRules,
            modelMetadata: typeof record.modelMetadata === 'string' ? JSON.parse(record.modelMetadata) : record.modelMetadata,
          };
        }
      } catch (err) {
        console.warn('[Database] Query analysis by id failed:', err.message);
      }
    }

    return inMemoryStore.find((r) => r.id === id && (!sessionId || r.sessionId === sessionId)) || null;
  },

  async deleteAnalysisById(id, sessionId = null) {
    const client = getPrismaClient();
    if (client && isConnected) {
      try {
        const query = { id };
        if (sessionId) query.sessionId = sessionId;
        await client.commandAnalysis.deleteMany({ where: query });
        return true;
      } catch (err) {
        console.warn('[Database] Delete analysis failed:', err.message);
      }
    }

    const initialLen = inMemoryStore.length;
    const filtered = inMemoryStore.filter((r) => !(r.id === id && (!sessionId || r.sessionId === sessionId)));
    inMemoryStore.length = 0;
    inMemoryStore.push(...filtered);
    return inMemoryStore.length < initialLen;
  },

  async clearHistory(sessionId = 'anonymous') {
    const client = getPrismaClient();
    if (client && isConnected) {
      try {
        await client.commandAnalysis.deleteMany({ where: { sessionId } });
        return true;
      } catch (err) {
        console.warn('[Database] Clear history failed:', err.message);
      }
    }

    const filtered = inMemoryStore.filter((r) => r.sessionId !== sessionId);
    inMemoryStore.length = 0;
    inMemoryStore.push(...filtered);
    return true;
  },
};
