import express from 'express';
const router = express.Router();

import {
  createUser,
  getUser,
  getTop100,
  updateUserScore,
} from '@/controllers/userControllers';

// POST
router.post('/', createUser);

// GET
router.get('/:userID', getUser);
router.get('/ranks', getTop100);

// PUT
router.put('/score', updateUserScore);

// DELETE

export { router as userRouter };
