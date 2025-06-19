import express from 'express';
import { testRouter } from '@/routes/testRoutes';
import { userRouter } from '@/routes/userRoutes';
import errorMiddleware from '@/middlewares/errorMiddleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/test', testRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
