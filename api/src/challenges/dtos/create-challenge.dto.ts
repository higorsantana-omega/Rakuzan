import {
  ArrayMaxSize,
  IsArray,
  IsDateString,
  ArrayMinSize,
  IsNotEmpty,
} from 'class-validator';
import Player from 'src/players/interfaces/players.interface';

export class CreateChallengeDTO {
  @IsDateString()
  @IsNotEmpty()
  dateTime: Date;

  @IsNotEmpty()
  requestBy: Player;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: Player[];
}
