import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CreatePlayerDTO from './dtos/create-player.dto';
import UpdatePlayerDTO from './dtos/update-player.dto';
import Player from './interfaces/players.interface';
import { ValidationParamsPipe } from '../common/pipes/validation-params.pipe';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createOrUpdatePlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
    return this.playersService.create(createPlayerDTO);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() updatePlayerDTO: UpdatePlayerDTO,
    @Param('id') id: string,
  ) {
    await this.playersService.update(id, updatePlayerDTO);
  }

  @Get()
  async getPlayers(): Promise<Player[]> {
    return this.playersService.getAllPlayers();
  }

  @Get('/:id')
  async getPlayerById(@Param('id') id: string): Promise<Player> {
    return this.playersService.getPlayerById(id);
  }

  @Delete('/:id')
  async deletePlayer(
    @Param('id', ValidationParamsPipe) id: string,
  ): Promise<void> {
    return this.playersService.deletePlayer(id);
  }
}
