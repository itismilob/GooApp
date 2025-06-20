import express from 'express';
import { testRouter } from '@/routes/testRoutes';
import { userRouter } from '@/routes/userRoutes';
import errorMiddleware from '@/middlewares/errorMiddleware';
import morgan from 'morgan';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.ENV === 'production') {
  app.use(morgan('combined'));
  app.use(helmet());
} else {
  app.use(morgan('dev'));
}

app.use('/test', testRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
