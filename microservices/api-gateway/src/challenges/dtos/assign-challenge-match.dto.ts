import { IsNotEmpty } from 'class-validator';
import Player from 'src/players/dtos/player.interface';
import { Result } from '../interfaces/challenges.interface';

export class AssignChallengeMatchDTO {
  @IsNotEmpty()
  def: Player;

  @IsNotEmpty()
  result: Result[];
}
