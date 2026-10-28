import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeRouter from './routes/analyze.js';
import historyRouter from './routes/history.js';
import healthRouter from './routes/health.js';
import { analyzeRateLimiter } from './middleware/rateLimiter.js';

dotenv.config();

export const app = express();

// Trust proxy for Render / Vercel deployment
app.set('trust proxy', 1);

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, server-to-server) or allowed origins
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(null, true); // Permissive for public API during Hacktoberfest demonstration
      }
    },
    credentials: true,
  })
);

// Payload size limits to protect against DoS
app.use(express.json({ limit: '100kb' }));

// Route registrations
app.use('/api/health', healthRouter);
app.use('/api/analyze', analyzeRateLimiter, analyzeRouter);
app.use('/api/history', historyRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'NotFound',
    message: `Endpoint ${req.method} ${req.originalUrl} not found on this spectral server.`,
  });
});

// Centralized Safe Error Handler
app.use((err, req, res, next) => {
  // Safe logging that does not log credentials or sensitive request bodies
  console.error(`[API Error] ${req.method} ${req.path}:`, err.message);

  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: err.name || 'InternalServerError',
    message: err.message || 'An unexpected error occurred while consulting the ghost.',
  });
});
