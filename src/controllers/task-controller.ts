import { NextFunction, Request, Response } from "express";
import { Task } from "../models/task-model";
import { User } from "../models/user-model";

export async function getTasks(req: Request, res: Response, next: NextFunction) {
  try {
    const assigneeId = req.query.assignee;
    const assignorId = req.query.assignor;
    
    const tasks = await Task.find({ assignee: assigneeId, assignor: assignorId });
    res.json({
      success: true,
      data: tasks
    });
  } catch(err) {
    next(err);
  }
}

export async function getTaskById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found'
      });
      return;
    }
    res.json({
      success: true,
      data: task,
    });
  } catch(err) {
    next(err);
  }
}

export async function createTask(req: Request, res: Response, next: NextFunction) {
  try {
    const assignor = await User.findById(req.body.assignor);
    if (!assignor) {
      res.status(404).json({
        message: 'Assignor not found',
        success: false,
      });
      return;
    }

    const assignee = await User.findById(req.body.assignor);
    if (!assignee) {
      res.status(404).json({
        message: 'Assignee not found',
        success: false
      });
      return;
    }

    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      assignor: req.body.assignor,
      assignee: req.body.assignee,
    });
    await task.save();
    res.json({
      success: true,
      data: task,
      message: 'Success creating task'
    });
  } catch(err) {
    next(err);
  }
}

export async function updateTask(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found'
      });
      return;
    }

    const assignor = await User.findById(req.body.assignor);
    if (!assignor) {
      res.status(404).json({
        message: 'Assignor not found',
        success: false,
      });
      return;
    }

    const assignee = await User.findById(req.body.assignor);
    if (!assignee) {
      res.status(404).json({
        message: 'Assignee not found',
        success: false
      });
      return;
    }

    const updated = await task.update({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      assignor: req.body.assignor,
      assignee: req.body.assignee,
    });
    res.json({
      success: true,
      message: 'Success updating task!',
      data: updated
    });
  } catch(err) {
    next(err);
  }
}

export async function deleteTask(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    } else {
      res.json({
        success: true,
        message: 'Success deleting task!'
      })
    }
  } catch(err) {
    next(err);
  }
}