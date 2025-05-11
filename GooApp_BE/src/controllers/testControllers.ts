import { Request, Response } from 'express';

const testGetData = (req: Request, res: Response) => {
  res.send('hello, this is test');
};

export { testGetData };
