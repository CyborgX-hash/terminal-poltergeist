import { app } from './app.js';
import { db } from './db/prisma.js';

const PORT = process.env.PORT || 5001;

async function startServer() {
  console.log('👻 Initializing Terminal Poltergeist Server...');

  // Test database connection
  const dbConnected = await db.checkConnection();
  if (dbConnected) {
    console.log('🔮 Connected to PostgreSQL database via Prisma.');
  } else {
    console.log('🕯️ PostgreSQL is offline or unconfigured. In-memory session store engaged.');
  }

  // Check Groq configuration
  if (process.env.GROQ_API_KEY && !process.env.GROQ_API_KEY.includes('replace_with')) {
    console.log('🧠 Groq API key detected. Model: openai/gpt-oss-20b active.');
  } else {
    console.log('🛡️ GROQ_API_KEY not configured. Deterministic Security Rule Engine active.');
  }

  app.listen(PORT, () => {
    console.log(`🦇 Terminal Poltergeist listening on port ${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  });
}

startServer();
