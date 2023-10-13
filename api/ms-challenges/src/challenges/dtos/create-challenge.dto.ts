import {
  ArrayMaxSize,
  IsArray,
  IsDateString,
  ArrayMinSize,
  IsNotEmpty,
} from 'class-validator';

export class CreateChallengeDTO {
  @IsDateString()
  @IsNotEmpty()
  dateTime: Date;

  @IsNotEmpty()
  request: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: string[];
}
