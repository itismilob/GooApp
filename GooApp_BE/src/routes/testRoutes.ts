import express from 'express';
const router = express.Router();

import { testGetData } from '../controllers/testControllers';

router.get('/', testGetData);

export { router as testRouter };
