import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, collection: 'rankings' })
export class Ranking extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  challenge: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  player: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  match: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  category: string;

  @Prop({ type: mongoose.Schema.Types.String })
  event: 'VICTORY' | 'DEFEAT';

  @Prop({ type: mongoose.Schema.Types.String })
  operation: '+' | '-';

  @Prop({ type: mongoose.Schema.Types.Number })
  points: number;
}

export const RankingSchema = SchemaFactory.createForClass(Ranking);

export interface RankingResult {
  player?: string;
  position?: number;
  points?: number;
  matchHistory?: MatchHistory;
}

export interface MatchHistory {
  victory: number;
  defeat: number;
}

export interface Match extends Document {
  category: string;
  players: string[];
  def: string;
  result: Result[];
  challenge: string;
}

export interface Result {
  set: string;
}

export interface Event {
  name: 'VICTORY' | 'DEFEAT';
  operation: '+' | '-';
  value: number;
}

export interface Category {
  readonly _id: string;
  readonly category: string;
  description: string;
  events: Event[];
}

export type ChallengeStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'CANCELLED'
  | 'REALIZED';

export interface Challenge {
  _id: string;
  dateTime: Date;
  dateRequest: Date;
  dateResponse: Date;

  status: ChallengeStatus;

  request: string;
  category: string;
  players: string[];
  match: string;
}
