import express from 'express';
const router = express.Router();

import {
  createUser,
  getUser,
  getTop100,
  updateUserTopScore,
} from '@/controllers/userControllers';

// POST
router.post('/', createUser);

// GET
router.get('/ranks', getTop100);
router.get('/:userID', getUser);

// PUT
router.put('/score', updateUserTopScore);

// DELETE

export { router as userRouter };
