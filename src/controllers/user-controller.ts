import { NextFunction, Request, Response } from "express";
import { Team } from "../models/team-model";
import { IUser, User } from "../models/user-model";
import { getTeams } from "./team-controller";

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
      const updated = await user.update({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        role: req.body.role,
        createdAt: req.body.createdAt,
      });
      res.json({
        success: true,
        data: updated,
        message: 'Success updating user!'
      });
    }
  } catch(err) {
    next(err);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const isDeleteTeam = req.query.deleteTeam == 'true';

    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    const teams = await Team.find({ leader: user._id });
    if (teams.length) {
      if (!isDeleteTeam) {
        res.status(400).json({
          success: false,
          message: 'There are still team with this user as leader',
        });
        return;
      }

      else {
        teams.forEach(async team => {
          await team.delete();
        });
      }
    }
    
    const deleted = await user.delete();
    res.json({
      success: true,
      message: 'Success deleting user!',
      data: deleted,
    });
  } catch(err) {
    next(err);
  }
}