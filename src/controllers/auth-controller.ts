import { NextFunction, Request, Response } from "express";
import { User } from "../models/user-model";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const username: string = req.body.username;
    const password: string = req.body.password;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }
  
    if (user.password != password) {
      res.status(400).json({
        success: false,
        message: 'Wrong password'
      });
      return;
    }
  
    res.json({
      success: true,
      data: user,
      message: 'Success login'
    });
  }

  catch(err) {
    next(err);
  }
}