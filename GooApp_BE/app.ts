import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

import { testRouter } from '@/routes/testRoutes';

app.use('/test', testRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
