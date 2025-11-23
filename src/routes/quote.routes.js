// src/routes/quote.routes.js
import { Router } from 'express';
import fixedWindowLimiter from '../middlewares/rateLimiter.js'
import quotes, { length } from '../data/quotes.js';
const router = Router();

router.get('/', fixedWindowLimiter, (req, res) => {
  const randomQuote = quotes[Math.floor(Math.random() * length)];
  res.json({ quote: randomQuote });
});

export default router;
