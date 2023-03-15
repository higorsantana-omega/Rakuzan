import { Schema } from 'mongoose';

export const PlayerSchema = new Schema(
  {
    phone: { type: String, unique: true },
    email: { type: String, unique: true },
    name: String,
    ranking: String,
    photo: String,
    position: Number,
  },
  { timestamps: true, collection: 'players' },
);
