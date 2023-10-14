import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Player from './interfaces/player.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PlayersService {
  private logger = new Logger(PlayersService.name);

  constructor(
    @InjectModel('Players') private readonly playerModel: Model<Player>,
  ) {}

  async create(createPlayerDTO: Player): Promise<Player> {
    try {
      const { email } = createPlayerDTO;

      const player = await this.playerModel.findOne({ email }).exec();
      if (player) {
        throw new BadRequestException(
          `Player with email ${email} already exists.`,
        );
      }

      const playerCreated = new this.playerModel(createPlayerDTO);
      return playerCreated.save();
    } catch (error) {
      this.logger.error(`error: ${error.message}`);
      throw new RpcException(error.message);
    }
  }

  async update(id: string, updatePlayerDTO: Player): Promise<void> {
    try {
      const player = await this.playerModel.findOne({ _id: id }).exec();
      if (!player) {
        throw new BadRequestException(`Player with id ${id} not exists.`);
      }

      await this.playerModel
        .findOneAndUpdate({ _id: id }, { $set: updatePlayerDTO })
        .exec();
    } catch (error) {
      this.logger.error(`error: ${error.message}`);
      throw new RpcException(error.message);
    }
  }

  async getAllPlayers(): Promise<Player[]> {
    try {
      const players = await this.playerModel.find().exec();
      return players;
    } catch (error) {
      this.logger.error(`error: ${error.message}`);
      throw new RpcException(error.message);
    }
  }

  async getPlayerById(id: string): Promise<Player> {
    try {
      const player = await this.playerModel.findOne({ _id: id }).exec();
      if (!player)
        throw new NotFoundException(`Player with id ${id} not found.`);

      return player;
    } catch (error) {
      this.logger.error(`error: ${error.message}`);
      throw new RpcException(error.message);
    }
  }

  async deletePlayer(id: string): Promise<void> {
    try {
      await this.playerModel.deleteOne({ _id: id });
    } catch (error) {
      this.logger.error(`error: ${error.message}`);
      throw new RpcException(error.message);
    }
  }
}
