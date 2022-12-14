import { NextFunction, Request, Response } from "express";
import { IUser, User } from "../models/user-model";

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await User.find();
    res.json({
      success: true,
      data: users
    });
  } catch(err) {
    next(err);
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.json({
      success: true,
      data: user
    });
  } catch(err) {
    next(err);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      role: req.body.role,
      createdAt: req.body.createdAt,
    });
    await user.save();
    res.json({
      success: true,
      data: user,
      message: 'Success creating user!',
    })
  } catch(err) {
    next(err);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      })
    } else {
      user.update({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        role: req.body.role,
        createdAt: req.body.createdAt,
      });
      await user.save();
      res.json({
        success: true,
        data: user,
        message: 'Success updating user!'
      });
    }
  } catch(err) {
    next(err);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
    } else {
      res.json({
        success: true,
        message: 'Success deleting user!'
      });
    }
  } catch(err) {
    next(err);
  }
}