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
  },
  password: String,
  name: String,
  role: String,
  createdAt: {
    type: Number,
    default: Date.now(),
  }
});

export const User = model<IUser>('User', userSchema, 'user');