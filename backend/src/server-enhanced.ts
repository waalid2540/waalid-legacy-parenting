import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import * as Sentry from '@sentry/node';

import authRoutes from './routes/auth';
import aiCoachRoutes from './routes/ai-coach';
import communityRoutes from './routes/community';
import feedRoutes from './routes/feed';
import workshopRoutes from './routes/workshops';
import { initializeSocket } from './socket';
import { logInfo, logError, logWarning } from './config/logger';
import { cache } from './config/redis';

dotenv.config();

const app = express();
const server = createServer(app);
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logWarning('Rate limit exceeded', { ip: req.ip });
    res.status(429).json({ message: 'Too many requests' });
  }
});

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(morgan('combined', {
  stream: {
    write: (message) => logInfo(message.trim())
  }
}));

app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.cache = cache;
  req.prisma = prisma;
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/ai-coach', aiCoachRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/workshops', workshopRoutes);

app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    const redisStatus = await cache.get('health-check');
    
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      database: 'connected',
      redis: redisStatus !== null ? 'connected' : 'disconnected',
      version: process.env.npm_package_version
    });
  } catch (error) {
    logError(error as Error);
    res.status(503).json({ 
      status: 'ERROR', 
      timestamp: new Date().toISOString() 
    });
  }
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logError(err, { 
    url: req.url, 
    method: req.method, 
    ip: req.ip 
  });
  
  res.status(500).json({ 
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message 
  });
});

const io = initializeSocket(server);

server.listen(PORT, () => {
  logInfo(`Server running on port ${PORT}`);
  logInfo(`Environment: ${process.env.NODE_ENV}`);
  logInfo(`WebSocket server initialized`);
});

process.on('SIGTERM', async () => {
  logInfo('SIGTERM received, shutting down gracefully');
  
  server.close(() => {
    logInfo('HTTP server closed');
  });
  
  await prisma.$disconnect();
  logInfo('Database connection closed');
  
  process.exit(0);
});

export { prisma, io, cache };