import { model, Schema } from "mongoose";
import { IUser } from "./user-model";

export interface ITeam {
  name: string,
  leader: IUser,
  members: IUser[],
  createdAt: number,
}

const teamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  leader: {
    type: String,
    required: true,
    ref: 'User'
  },
  members: {
    type: [{
      type: String,
      ref: 'User'
    }],
    default: [],
  },
  createdAt: {
    type: Number,
    default: Date.now()
  },
  __v: {
    type: Number,
    select: false
  }
});

export const Team = model<ITeam>('Team', teamSchema, 'team');