import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RpcException } from '@nestjs/microservices';
import { Challenge } from './interfaces/challenges.interface';
import { CreateChallengeDTO } from './dtos/create-challenge.dto';
import { UpdateChallengeDTO } from './dtos/update-challenge.dto';

@Injectable()
export class ChallengesService {
  private readonly logger = new Logger(ChallengesService.name);

  constructor(
    @InjectModel('Challenge')
    private readonly challengeModel: Model<Challenge>,
  ) {}

  async create(createChallengeDTO: CreateChallengeDTO) {
    try {
      const challenge = new this.challengeModel(createChallengeDTO);

      challenge.dateRequest = new Date();
      challenge.status = 'PENDING';

      return challenge.save();
    } catch (error) {
      this.logger.error(`${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async update(
    _id: string,
    updateChallengeDTO: UpdateChallengeDTO,
  ): Promise<void> {
    try {
      const challenge = await this.challengeModel.findOne({ _id }).exec();
      if (!challenge) {
        throw new BadRequestException(`challenge with id ${_id} not exists.`);
      }

      const challengeUpdated = {
        ...challenge,
        ...updateChallengeDTO,
      };

      if (updateChallengeDTO.status) {
        challengeUpdated.dateResponse = new Date();
      }

      await this.challengeModel
        .findOneAndUpdate({ _id }, { $set: challengeUpdated })
        .exec();
    } catch (error) {
      this.logger.error(`${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async deleteChallenge(_id: string): Promise<void> {
    try {
      const challenge = await this.challengeModel.findById(_id).exec();
      if (!challenge)
        throw new BadRequestException(
          `Challenge with id ${_id} not registered!`,
        );

      challenge.status = 'CANCELLED';

      await this.challengeModel
        .findOneAndUpdate({ _id }, { $set: challenge })
        .exec();
    } catch (error) {
      this.logger.error(`${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async getAllChallenges(): Promise<Challenge[]> {
    try {
      const categories = await this.challengeModel.find().exec();
      return categories;
    } catch (error) {
      this.logger.error(`${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async getChallengesById(_id: string): Promise<Challenge> {
    try {
      const category = await this.challengeModel.findOne({ _id }).exec();
      return category;
    } catch (error) {
      this.logger.error(`${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async getChallengeByPlayerId(_id: string): Promise<Challenge[]> {
    try {
      return this.challengeModel
        .find({})
        .where('players')
        .in(_id as any)
        .exec();
    } catch (error) {
      this.logger.error(`${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async assignChallengeMatch(_id: string, matchId: string): Promise<void> {
    try {
      const challenge = await this.challengeModel.findById(_id).exec();
      if (!challenge)
        throw new NotFoundException(`challenge with id ${_id} not found.`);

      challenge.status = 'REALIZED';
      challenge.match = matchId;

      await this.challengeModel
        .findOneAndUpdate({ _id }, { $set: challenge })
        .exec();
    } catch (error) {
      this.logger.error(`${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }
}
