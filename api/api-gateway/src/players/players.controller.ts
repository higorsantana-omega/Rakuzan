import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CreatePlayerDTO from './dtos/create-player.dto';
import UpdatePlayerDTO from './dtos/update-player.dto';
import { ValidationParamsPipe } from '../common/pipes/validation-params.pipe';
import { ClientProxyBasket } from 'src/proxy/client-proxy';
import { Observable } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { LocalStorageService } from 'src/local-storage/local-storage.service';

@Controller('/api/players')
export class PlayersController {
  private logger = new Logger(PlayersController.name);
  private clientMSAdmin = this.clientProxyBasket.getClientProxyAdmin();

  constructor(
    private clientProxyBasket: ClientProxyBasket,
    private localStorageService: LocalStorageService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
    this.logger.log(`createPlayerDTO: ${JSON.stringify(createPlayerDTO)}`);

    const category = await this.clientMSAdmin
      .send('get-categories', createPlayerDTO.category)
      .toPromise();

    if (category) {
      this.clientMSAdmin.emit('create-player', createPlayerDTO);
    } else {
      throw new BadRequestException(`Category not exists!`);
    }
  }

  @Get()
  getPlayers(@Query('idPlayer') _id: string): Observable<any> {
    return this.clientMSAdmin.send('get-players', _id ? _id : '');
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() updatePlayerDTO: UpdatePlayerDTO,
    @Param('id', ValidationParamsPipe) id: string,
  ) {
    const category = await this.clientMSAdmin
      .send('get-categories', updatePlayerDTO.category)
      .toPromise();

    if (category) {
      this.clientMSAdmin.emit('update-player', { id, player: updatePlayerDTO });
    } else {
      throw new BadRequestException(`Category not exists!`);
    }
  }

  @Delete('/:id')
  async deletePlayer(
    @Param('id', ValidationParamsPipe) id: string,
  ): Promise<void> {
    this.clientMSAdmin.emit('delete-player', { id });
  }

  @Post('/:_id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFiles(@UploadedFile() file, @Param('_id') _id: string) {
    if (!file) {
      throw new BadRequestException('File is empty');
    }

    const player = await this.clientMSAdmin
      .send('get-players', _id)
      .toPromise();
    if (!player) {
      throw new BadRequestException('Player not found');
    }

    const fileURL = await this.localStorageService.uploadFile(file);

    this.clientMSAdmin.emit('update-player', {
      id: _id,
      player: { photo: fileURL },
    });
  }
}
