import {
  ArrayMaxSize,
  IsArray,
  IsDateString,
  ArrayMinSize,
  IsNotEmpty,
} from 'class-validator';
import Player from '../../players/dtos/player.interface';

export class CreateChallengeDTO {
  @IsDateString()
  @IsNotEmpty()
  dateTime: Date;

  @IsNotEmpty()
  requestBy: Player;

  @IsNotEmpty()
  category: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: Player[];
}
