import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import connectDB from './config/db.js';

// Імпорт роутів
import authRoutes from './api/auth.js';
import routeRoutes from './api/route.js';
import loadRoutes from './api/loads.js';

// Конфігурація середовища
dotenv.config();
const app = express();

// Підключення до бази даних
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(helmet());
app.use(express.json());
app.use(express.static('public'));

// Rate limiting
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS,
  max: process.env.RATE_LIMIT_MAX_REQUESTS
});
app.use('/api/', limiter);

// Логування запитів
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
  });
}

// Роути
app.use('/api/auth', authRoutes);
app.use('/api/route', routeRoutes);
app.use('/api/loads', loadRoutes);

// Обробка помилок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ AI Dispatcher API running on port ${PORT}`);
  console.log(`✅ AI Диспетчер працює на порту ${PORT}`);
});
