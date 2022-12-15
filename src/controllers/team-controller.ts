import { NextFunction, Request, Response } from "express";
import { Team } from "../models/team-model";

export async function getTeams(req: Request, res: Response, next: NextFunction) {
  try {
    const teams = await Team.find().populate(['leader', 'members']);
    res.json({
      success: true,
      data: teams
    });
  } catch(err) {
    next(err);
  }
}

export async function getTeamById(req: Request, res: Response, next: NextFunction) {
  try {
    const id: string = req.params.id;
    const team = await Team.findById(id).populate(['leader', 'members']);
    if (!team) {
      res.status(404).json({
        success: false,
        message: 'Team not found'
      });
      return;
    }

    res.json({
      success: true,
      data: team
    });
  } catch(err) {
    next(err);
  }
}

export async function createTeam(req: Request, res: Response, next: NextFunction) {
  try {
    const team = new Team({
      name: req.body.name,
      leader: req.body.leader,
      members: req.body.members
    });
    await team.save();
    res.json({
      success: true,
      data: team,
      message: 'Success creating team!',
    });
  } catch(err) {
    next(err);
  }
}

export async function updateTeam(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const team = await Team.findById(id);
    if (!team) {
      res.status(404).json({
        success: false,
        message: 'Team not found'
      });
      return;
    }

    const updated = await team.update({
      name: req.body.name,
      leader: req.body.leader,
      members: req.body.members
    });
    res.json({
      success: true,
      message: 'Success updating team!',
      data: updated
    });
  } catch(err) {
    next(err);
  }
}

export async function deleteTeam(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const team = await Team.findByIdAndDelete(id);
    if (!team) {
      res.status(404).json({
        success: false,
        message: 'Team not found'
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