import { Request, Response, NextFunction } from 'express';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {

  // mongo: duplicate value on unique fields
  if (err.code == 11000) {
    const field = Object.keys(err.keyValue);
    const value = Object.values(err.keyValue);
    return res.status(409).json({
      success: false,
      message: `Account with ${field} ${value} already exists`,
    });
  }

  res.status(500).json({
    message: 'Something went wrong'
  })
}