import { Body, Controller, Post } from '@nestjs/common';
import CreatePlayerDTO from './dtos/create-player.dto';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor (
    private readonly playersService: PlayersService
  ) {}

  @Post()
  async createOrUpdatePlayer(
    @Body() createPlayerDTO: CreatePlayerDTO
  ) {
    await this.playersService.createOrUpdatePlayer(createPlayerDTO)
  }
}
