import { Document } from 'mongoose';
import Player from '../../players/dtos/player.interface';

export type ChallengeStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'CANCELLED'
  | 'REALIZED';

export interface Challenge extends Document {
  dateTime: Date;
  dateRequest: Date;
  dateResponse: Date;

  status: ChallengeStatus;

  request: Player;
  category: string;
  players: Player[];
  match: Match;
}

export interface Match extends Document {
  category: string;
  challenge: string;
  players: Player[];
  def: Player;
  result: Result[];
}

export interface Result {
  set: string;
}
