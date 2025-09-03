import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';
import jwt from 'jsonwebtoken';
import { logInfo, logError } from '../config/logger';

export const initializeSocket = (server: HTTPServer) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-domain.com'] 
        : ['http://localhost:3000'],
      credentials: true
    }
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new Error('Authentication error'));
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
      if (err) {
        return next(new Error('Authentication error'));
      }
      
      socket.data.user = decoded;
      next();
    });
  });

  io.on('connection', (socket) => {
    const userId = socket.data.user.userId;
    logInfo(`User ${userId} connected`);

    socket.join(`user:${userId}`);

    socket.on('join-community', () => {
      socket.join('community');
      logInfo(`User ${userId} joined community`);
    });

    socket.on('leave-community', () => {
      socket.leave('community');
      logInfo(`User ${userId} left community`);
    });

    socket.on('typing', (data) => {
      socket.to('community').emit('user-typing', {
        userId,
        ...data
      });
    });

    socket.on('new-message', (message) => {
      io.to('community').emit('message', {
        ...message,
        userId,
        timestamp: new Date()
      });
    });

    socket.on('disconnect', () => {
      logInfo(`User ${userId} disconnected`);
    });

    socket.on('error', (error) => {
      logError(new Error(`Socket error for user ${userId}`), error);
    });
  });

  return io;
};