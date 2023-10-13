import mongoose from 'mongoose';

export const ChallengeSchema = new mongoose.Schema(
  {
    dateTime: { type: Date },
    dateRequest: { type: Date },
    dateResponse: { type: Date },
    status: { type: String },
    request: { type: mongoose.Schema.Types.ObjectId },
    category: { type: mongoose.Schema.Types.ObjectId },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match',
    },
  },
  { timestamps: true, collection: 'challenges' },
);
