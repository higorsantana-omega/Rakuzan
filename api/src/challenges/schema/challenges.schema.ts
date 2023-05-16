import mongoose from 'mongoose';
import { Challenge } from '../interfaces/challenges.interface';

export const ChallengeSchema = new mongoose.Schema<Challenge>(
  {
    dateTime: { type: Date },
    dateRequest: { type: Date },
    dateResponse: { type: Date },
    status: { type: String },
    request: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    category: { type: String },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
    },
  },
  { timestamps: true, collection: 'challenges' },
);
