import rateLimit from 'express-rate-limit';

export const analyzeRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 30 analysis requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'RateLimitExceeded',
    message: 'Too many analysis requests. Please wait a minute before summoning the poltergeist again.',
  },
});
