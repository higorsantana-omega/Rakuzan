import { IsNotEmpty } from 'class-validator';
import Player from 'src/players/interfaces/players.interface';
import { Result } from '../interfaces/challenges.interface';

export class AssignChallengeMatchDTO {
  @IsNotEmpty()
  def: Player;

  @IsNotEmpty()
  result: Result[];
}
