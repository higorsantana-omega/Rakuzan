import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateChallengeDTO } from './dtos/create-challenge.dto';
import { Challenge, Match } from './interfaces/challenges.interface';
import { UpdateChallengeDTO } from './dtos/update-challenge.dto';
import { AssignChallengeMatchDTO } from './dtos/assign-challenge-match.dto';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenge')
    private readonly challengeModel: Model<Challenge>,
    @InjectModel('Match')
    private readonly matchModel: Model<Match>,
    private readonly categoriesService: CategoriesService,
    private readonly playersService: PlayersService,
  ) {}

  async create(createChallengeDTO: CreateChallengeDTO) {
    const players = await this.playersService.getAllPlayers();

    createChallengeDTO.players.map((playerDTO) => {
      const playersWithId = players.filter(
        (player) => player._id === playerDTO._id,
      );
      if (!playersWithId.length)
        throw new BadRequestException(
          `The player with id ${playerDTO._id} not is an player`,
        );
    });

    const requestIsPlayerOfTheMatch = createChallengeDTO.players.filter(
      (player) => player._id === createChallengeDTO.requestBy,
    );
    if (!requestIsPlayerOfTheMatch.length)
      throw new BadRequestException(
        `The request should be player of the match`,
      );

    const playerCategory = await this.categoriesService.getCategoryByPlayer(
      createChallengeDTO.requestBy._id,
    );
    if (!playerCategory)
      throw new BadRequestException(
        'The requester needs to register in a category',
      );

    const challenge = new this.challengeModel(createChallengeDTO);

    challenge.category = playerCategory.category;
    challenge.dateRequest = new Date();
    challenge.status = 'PENDING';

    return challenge.save();
  }

  async update(
    _id: string,
    updateChallengeDTO: UpdateChallengeDTO,
  ): Promise<void> {
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
  }

  async getAllChallenges(): Promise<Challenge[]> {
    const categories = await this.challengeModel
      .find()
      .populate('request')
      .populate('players')
      .populate('match')
      .exec();
    return categories;
  }

  async getChallengeByPlayerId(_id: string): Promise<Challenge[]> {
    const player = await this.playersService.getPlayerById(_id);
    if (!player) throw new BadRequestException(`The player ${_id} not exists`);

    return this.challengeModel
      .find({})
      .where('players')
      .in(_id as any)
      .populate('request')
      .populate('players')
      .populate('match')
      .exec();
  }

  async assignChallengeMatch(
    _id: string,
    assignChallengeMatchDTO: AssignChallengeMatchDTO,
  ): Promise<void> {
    const challenge = await this.challengeModel.findById(_id).exec();
    if (!challenge)
      throw new NotFoundException(`challenge with id ${_id} not found.`);

    const player = challenge.players.find(
      (player) => player._id === assignChallengeMatchDTO.def,
    );

    if (!player)
      throw new BadRequestException(
        `The winning player is not part of the match.`,
      );

    const match = new this.matchModel(assignChallengeMatchDTO);

    match.category = challenge.category;
    match.players = challenge.players;

    const result = await match.save();

    challenge.status = 'REALIZED';
    challenge.match = result._id;

    await this.challengeModel
      .findOneAndUpdate({ _id }, { $set: challenge })
      .exec();
  }

  async deleteChallenge(_id: string): Promise<void> {
    const challenge = await this.challengeModel.findById(_id).exec();
    if (!challenge)
      throw new BadRequestException(`Challenge with id ${_id} not registered!`);

    challenge.status = 'CANCELLED';

    await this.challengeModel
      .findOneAndUpdate({ _id }, { $set: challenge })
      .exec();
  }
}
