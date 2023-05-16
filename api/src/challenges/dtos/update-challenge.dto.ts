import { IsDateString, IsOptional } from 'class-validator';
import { ChallengeStatus } from '../interfaces/challenges.interface';

export class UpdateChallengeDTO {
  @IsDateString()
  @IsOptional()
  dateTime: Date;

  @IsOptional()
  status: ChallengeStatus;
}
