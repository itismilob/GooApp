import type { Request, Response, NextFunction } from 'express';

// 컨트롤러의 프롭 타입을 공통적으로 사용하기 위해 선언
export type Controller = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
