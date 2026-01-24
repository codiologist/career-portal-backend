
import express, { Application } from 'express';
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from 'cors';
import { notFound } from './middlewares/notFound';
import { RootRouter } from './routes/rootRouter';
import { globalErrorHandler } from './middlewares/errorHandler';
import seed from './lib/seed';


const app: Application = express();
seed()
app.use(cookieParser());
// Middleware
app.use(cors({
  origin: "http://localhost:3000", // your frontend URL
  credentials: true // allow cookies to be sent
}));
app.use(express.json());

// Routes
app.use('/api/v1', RootRouter);


// Health check
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// 404 and Error Handler
app.use(notFound);
app.use(globalErrorHandler);

export default app;
