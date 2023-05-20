import { IsNotEmpty, IsOptional } from 'class-validator';

export default class UpdatePlayerDTO {
  @IsNotEmpty()
  readonly phone: string;

  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  category: string;
}
