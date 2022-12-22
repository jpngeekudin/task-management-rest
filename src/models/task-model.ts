import { model, Schema } from "mongoose";
import { IUser } from "./user-model";

export interface ITask {
  title: string,
  description: string,
  status: ITaskStatus,
  assignor: IUser,
  assignee: IUser
}

export type ITaskStatus = 'open' | 'progress' | 'done';

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    default: 'open',
    enum: ['open', 'progress', 'done']
  },
  assignor: {
    type: String,
    required: true,
    ref: 'User',
  },
  assignee: {
    type: String,
    required: true,
    ref: 'User'
  },
  __v: {
    type: Number,
    select: false,
  }
});

export const Task = model<ITask>('Task', taskSchema, 'task');