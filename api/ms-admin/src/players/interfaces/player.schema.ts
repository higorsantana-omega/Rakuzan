import { Schema } from 'mongoose';

export const PlayerSchema = new Schema(
  {
    phone: { type: String, unique: true },
    email: { type: String, unique: true },
    category: { type: Schema.Types.ObjectId, ref: 'Categories' },
    name: String,
    ranking: String,
    photo: String,
    position: Number,
  },
  { timestamps: true, collection: 'players' },
);
