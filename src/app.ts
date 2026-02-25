/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { notFound } from './middlewares/notFound';
import { RootRouter } from './routes/rootRouter';
import { globalErrorHandler } from './middlewares/errorHandler';
//import seed from './lib/seed';
import path from 'path';
import helmet from 'helmet';
import { apiLimitet } from './lib/rateLimit/apiLimiter';
import { prisma } from './config/prisma';

const app: Application = express();

app.use(helmet());
app.use('/', apiLimitet);

app.use(cookieParser());

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000', // your frontend URL
    credentials: true, // allow cookies to be sent
  }),
);

app.use(express.json());

app.use(
  '/api/v1/uploads',
  express.static(path.join(process.cwd(), 'uploads'), {
    setHeaders: (res: import('http').ServerResponse) => {
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      res.setHeader('Access-Control-Allow-Origin', '*');
    },
  }),
);

// Routes
app.use('/api/v1', RootRouter);

// Health check
app.get('/api/health', async (req, res) => {
  try {
    // Optionally, check database or other critical services
    const dbStatus = await prisma.$queryRaw`SELECT 1`; // Example for Prisma/DB health check

    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: dbStatus ? 'ok' : 'down',
        // add other services here if needed
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: 'Service Unavailable',
      timestamp: new Date().toISOString(),
      error: error.message,
    });
  }
});

// 404 and Error Handler
app.use(notFound);
app.use(globalErrorHandler);

export default app;
