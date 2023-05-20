import { Body, Controller, Logger } from '@nestjs/common';
import { PlayersService } from './players.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import Player from './interfaces/player.interface';

const ackErrors = ['E1100'];

@Controller('players')
export class PlayersController {
  private logger = new Logger(PlayersController.name);

  constructor(private readonly playersService: PlayersService) {}

  @EventPattern('create-player')
  async createPlayer(
    @Body() createPlayerDTO: Player,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    this.logger.log(`player: ${JSON.stringify(createPlayerDTO)}`);

    try {
      await this.playersService.create(createPlayerDTO);

      await channel.ack(originalMessage);
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);

      const errors = ackErrors.filter((ack) => error.message.includes(ack));

      if (errors) {
        await channel.ack(originalMessage);
      }
    }
  }

  @EventPattern('update-player')
  async updatePlayer(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      this.logger.log(`data: ${JSON.stringify(data)}`);

      const player: Player = data.player;

      await this.playersService.update(data.id, player);

      await channel.ack(originalMessage);
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);

      const errors = ackErrors.filter((ack) => error.message.includes(ack));

      if (errors) {
        await channel.ack(originalMessage);
      }
    }
  }

  @MessagePattern('get-players')
  async getPlayers(
    @Payload() _id: string,
    @Ctx() context: RmqContext,
  ): Promise<Player[] | Player> {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      if (_id) {
        return this.playersService.getPlayerById(_id);
      }

      return this.playersService.getAllPlayers();
    } finally {
      await channel.ack(originalMessage);
    }
  }

  @EventPattern('delete-player')
  async deletePlayer(
    @Payload() _id: string,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      await this.playersService.deletePlayer(_id);
      await channel.ack(originalMessage);
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);

      const errors = ackErrors.filter((ack) => error.message.includes(ack));

      if (errors) {
        await channel.ack(originalMessage);
      }
    }
  }
}
