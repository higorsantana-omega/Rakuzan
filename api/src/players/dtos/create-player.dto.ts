import { IsEmail, IsNotEmpty } from 'class-validator';

export default class CreatePlayerDTO {
  @IsNotEmpty()
  readonly phone: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly name: string;
}
