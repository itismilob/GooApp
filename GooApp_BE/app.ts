import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

import { testRouter } from '@/routes/testRoutes';
import { userRouter } from '@/routes/userRoutes';

app.use('/test', testRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
