import { Document } from 'mongoose';
import Player from 'src/players/interfaces/players.interface';

export interface Event {
  name: string;
  operation: string;
  value: number;
}

export interface Category extends Document {
  readonly category: string;
  description: string;
  events: Event[];
  players: Player[];
}
