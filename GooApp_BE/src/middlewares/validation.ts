import { CustomError } from '@/utils/customError';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export default function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError(
      400,
      'INVALID_VALUE',
      '요청의 형식이 잘못되었습니다.',
    );
  }

  next();
}
