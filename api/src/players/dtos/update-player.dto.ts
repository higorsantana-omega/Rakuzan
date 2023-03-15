import { IsNotEmpty } from 'class-validator';

export default class UpdatePlayerDTO {
  @IsNotEmpty()
  readonly phone: string;

  @IsNotEmpty()
  readonly name: string;
}
