import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import CreatePlayerDTO from './dtos/create-player.dto';
import Player from './interfaces/players.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import UpdatePlayerDTO from './dtos/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Players') private readonly playerModel: Model<Player>,
  ) {}

  async create(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    const { email } = createPlayerDTO;

    const player = await this.playerModel.findOne({ email }).exec();
    if (player) {
      throw new BadRequestException(
        `Player with email ${email} already exists.`,
      );
    }

    const playerCreated = new this.playerModel(createPlayerDTO);
    return playerCreated.save();
  }

  async update(id: string, updatePlayerDTO: UpdatePlayerDTO): Promise<void> {
    const player = await this.playerModel.findOne({ _id: id }).exec();
    if (!player) {
      throw new BadRequestException(`Player with id ${id} not exists.`);
    }

    await this.playerModel
      .findOneAndUpdate({ _id: id }, { $set: updatePlayerDTO })
      .exec();
  }

  async getAllPlayers(): Promise<Player[]> {
    const players = await this.playerModel.find().exec();
    return players;
  }

  async getPlayerById(id: string): Promise<Player> {
    const player = await this.playerModel.findOne({ _id: id }).exec();
    if (!player) throw new NotFoundException(`Player with id ${id} not found.`);

    return player;
  }

  async deletePlayer(id: string): Promise<void> {
    await this.playerModel.deleteOne({ _id: id });
  }
}
