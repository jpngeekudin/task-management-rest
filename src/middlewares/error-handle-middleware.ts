import { Request, Response, NextFunction } from 'express';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {

  console.log(JSON.stringify(err));

  // mongo: duplicate value on unique fields
  if (err.code == 11000) {
    const field = Object.keys(err.keyValue);
    const value = Object.values(err.keyValue);
    return res.status(409).json({
      success: false,
      message: `Account with ${field} ${value} already exists`,
    });
  }

  // mongo: validation error
  else if (err.name == 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: err.message,
    })
  }

  res.status(500).json({
    message: 'Something went wrong'
  })
}