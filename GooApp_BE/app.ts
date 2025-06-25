import express from 'express';
import { userRouter } from '@/routes/userRoutes';
import errorMiddleware from '@/middlewares/errorMiddleware';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const { PORT, MONGODB_URI } = process.env;

app.use(express.json());

async function connectDB() {
  try {
    if (!MONGODB_URI) return;
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB 연결 성공');
  } catch (err) {
    console.error('MongoDB 연결 실패:', err);
  }
}
connectDB();

if (process.env.ENV === 'production') {
  app.use(morgan('combined'));
  app.use(helmet());
} else {
  app.use(morgan('dev'));
}

app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
