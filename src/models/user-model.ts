import { Document, model, Schema } from "mongoose";

export interface IUser {
  username: string,
  password: string,
  name: string,
  role: string,
  createdAt: number,
}

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    requried: true,
    enum: ['leader', 'member'],
  },
  createdAt: {
    type: Number,
    default: Date.now(),
    requried: true,
  },
  __v: {
    type: Number,
    select: false
  }
});

export const User = model<IUser>('User', userSchema, 'user');