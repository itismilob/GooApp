import { CustomError } from '@/utils/customError';
import type { Request, Response, NextFunction } from 'express';

export default function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  // 기본값
  let errorStatus = 500;
  let errorCode = 'INTERNAL_SERVER_ERROR';
  let message = '서버 내부 오류가 발생했습니다.';

  // 커스텀 에러 처리
  if (err instanceof CustomError) {
    errorStatus = err.statusCode;
    errorCode = err.errorCode;
    message = err.message;
  }

  // 에러 로깅
  console.error(err);
  console.error(`[${req.method} ${req.url} - ${message}]`);

  res.status(errorStatus).json({ message, errorCode });
}
