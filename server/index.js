import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import contactRouter from './routes/contact.js';
import gemsRouter from './routes/gems.js';
import blogsRouter from './routes/blogs.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Security
app.use(helmet());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));

// Rate limit (global)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Health
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), env: process.env.NODE_ENV || 'dev' });
});

// API routes
app.use('/api/contact', contactRouter);
app.use('/api/gems', gemsRouter);
app.use('/api/blogs', blogsRouter);

// 404
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✨ Abeywardana Gems API listening on http://localhost:${PORT}`);
});
