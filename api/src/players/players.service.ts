import { Injectable, Logger } from '@nestjs/common';
import CreatePlayerDTO from './dtos/create-player.dto';
import Player from './interfaces/players.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    @InjectModel('Players') private readonly playerModel: Model<Player>,
  ) {}

  async createOrUpdatePlayer(
    createPlayerDTO: CreatePlayerDTO,
  ): Promise<Player> {
    this.logger.log(`createPlayerDTO: ${createPlayerDTO}`);

    const { email } = createPlayerDTO;

    const player = await this.playerModel.findOne({ email }).exec();
    if (player) {
      return this.update(createPlayerDTO);
    }

    return this.create(createPlayerDTO);
  }

  async getAllPlayers(): Promise<Player[]> {
    return this.playerModel.find().exec();
  }

  async getPlayerByEmail(email: string): Promise<Player> {
    return this.playerModel.findOne({ email });
  }

  async deletePlayer(email: string): Promise<void> {
    await this.playerModel.findOneAndRemove({ email });
  }

  private async create(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    const player = new this.playerModel(createPlayerDTO);
    return player.save();
  }

  private async update(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    return this.playerModel
      .findOneAndUpdate(
        { email: createPlayerDTO.email },
        { $set: createPlayerDTO },
      )
      .exec();
  }
}
