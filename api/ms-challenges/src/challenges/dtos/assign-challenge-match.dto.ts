import { IsNotEmpty } from 'class-validator';
import { Result } from '../interfaces/challenges.interface';

export class AssignChallengeMatchDTO {
  @IsNotEmpty()
  def: string;

  @IsNotEmpty()
  result: Result[];
}
