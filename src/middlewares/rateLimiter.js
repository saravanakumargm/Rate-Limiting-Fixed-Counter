import FixedWindowCounter from '../utils/fixedWindowCounter.js'
import { rateLimitConfigs } from '../config.js';
const windows = new Map();

const LIMIT = rateLimitConfigs.LIMIT;
const WINDOW_SIZE_MS = rateLimitConfigs.WINDOW_SIZE_MS;

function fixedWindowLimiter(req, res, next) {
  const userIp = req.ip;
  let counter = windows.get(userIp);

  if (!counter) {
    counter = new FixedWindowCounter(LIMIT, WINDOW_SIZE_MS);
    windows.set(userIp, counter);
  }

  if (counter.isAllowed()) {
    return next();
  }

  return res.status(429).json({
    message: 'Too many requests in this time window (Fixed Window Counter).'
  });
}

export default fixedWindowLimiter;
