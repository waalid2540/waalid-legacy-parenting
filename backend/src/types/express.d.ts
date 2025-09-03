import { PrismaClient } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; email: string };
      cache?: any;
      prisma?: PrismaClient;
    }
  }
}

export {};