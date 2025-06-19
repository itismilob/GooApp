import type { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  status?: number;
  code?: string;
}

export default function errorMiddleware(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // 기본값
  let status = 500;
  let message = 'Internal Server Error';

  // 커스텀 에러 처리
  if (err.name === 'ValidationError') {
    status = 400;
    message = err.message;
  } else if (err.name === 'UnauthorizedError') {
    status = 401;
    message = 'Unauthorized';
  } else if (err.status) {
    // 직접 던질 때 { status, message } 형태로 던졌다면
    status = err.status;
    message = err.message || message;
  }

  res.status(status).json({ error: message });
}
