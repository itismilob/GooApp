import {
  createUser,
  getUser,
  getTop100,
  updateUserTopScore,
} from '@/controllers/userControllers';
import { body, param } from 'express-validator';

import express from 'express';
import validateRequest from '@/middlewares/validation';
const router = express.Router();

// POST
router.post('/', createUser);

// GET
router.get('/ranks', getTop100);
// param - validation
router.get('/:userID', param('userID').isMongoId(), validateRequest, getUser);

// PUT
// body - validation
router.put(
  '/score',
  body('userID').isMongoId(),
  body('score').isInt(),
  validateRequest,
  updateUserTopScore,
);

// DELETE

export { router as userRouter };
