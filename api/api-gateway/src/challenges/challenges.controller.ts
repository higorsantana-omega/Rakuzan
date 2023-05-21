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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxyBasket } from '../proxy/client-proxy';
import { CreateChallengeDTO } from './dtos/create-challenge.dto';
import { Observable } from 'rxjs';
import { ChallengeStatusValidatorPipe } from '../common/pipes/challenge-status-validator.pipe';
import { UpdateChallengeDTO } from './dtos/update-challenge.dto';
import { AssignChallengeMatchDTO } from './dtos/assign-challenge-match.dto';
import { Category } from 'src/categories/dtos/category.interface';
import { Match } from './interfaces/challenges.interface';

@Controller('/api/challenges')
export class ChallengesController {
  private logger = new Logger(ChallengesController.name);
  private clientMSChallenge = this.clientProxyBasket.getClientProxyChallenge();
  private clientMSAdmin = this.clientProxyBasket.getClientProxyAdmin();

  constructor(private clientProxyBasket: ClientProxyBasket) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createChallenge(@Body() createChallengeDTO: CreateChallengeDTO) {
    await Promise.all(
      createChallengeDTO.players.map(async (player) => {
        const playerExists = await this.clientMSAdmin
          .send('get-players', player)
          .toPromise();
        if (!playerExists)
          throw new BadRequestException(`the player id ${player} not exists`);
      }),
    );

    const requestIsPlayerOfTheMatch = createChallengeDTO.players.filter(
      (player) => player._id === createChallengeDTO.requestBy,
    );
    if (!requestIsPlayerOfTheMatch.length)
      throw new BadRequestException(
        `The request should be player of the match`,
      );

    const categories: Category[] = await this.clientMSAdmin
      .emit('get-categories', createChallengeDTO.category)
      .toPromise();
    if (!categories) throw new BadRequestException(`The category not exists`);

    this.clientMSChallenge.emit('create-challenge', {
      challenge: createChallengeDTO,
    });
  }

  @Get()
  async getChallenge(@Query('id') _id: string): Promise<Observable<any>> {
    if (_id) {
      const player = await this.clientMSAdmin
        .send('get-players', _id ? _id : '')
        .toPromise();
      if (!player) throw new BadRequestException(`Player not found.`);
    }

    return this.clientMSChallenge
      .send('get-challenges', _id ? _id : '')
      .toPromise();
  }

  @Put('/:challenge')
  @UsePipes(ValidationPipe)
  async updateChallenge(
    @Body(ChallengeStatusValidatorPipe) updateChallengeDTO: UpdateChallengeDTO,
    @Param('challenge') _id: string,
  ) {
    const challenge = await this.clientMSAdmin
      .send('get-challenges', _id)
      .toPromise();
    if (!challenge) throw new BadRequestException(`Challenge not found`);

    if (challenge.status !== 'PENDING') {
      throw new BadRequestException(
        `Challenge not be update because your status is not PENDING`,
      );
    }

    this.clientMSChallenge.emit('update-challenge', {
      id: _id,
      challenge: updateChallengeDTO,
    });
  }

  @Post('/:challenge/match')
  async assignChallengeMatch(
    @Body(ValidationPipe) assignChallengeMatchDTO: AssignChallengeMatchDTO,
    @Param('challenge') _id: string,
  ): Promise<void> {
    const challenge = await this.clientMSAdmin
      .send('get-challenges', _id)
      .toPromise();
    if (!challenge) throw new BadRequestException(`Challenge not found`);

    if (challenge.status === 'REALIZED')
      throw new BadRequestException(`Challenge already occurred`);

    if (challenge.status !== 'ACCEPTED')
      throw new BadRequestException(`Challenge not accepted`);

    if (!challenge.players.includes(assignChallengeMatchDTO.def))
      throw new BadRequestException(`The player winners not includes on match`);

    const match = {
      category: challenge.category,
      def: assignChallengeMatchDTO.def,
      challenge: _id,
      players: challenge.players,
      result: assignChallengeMatchDTO.result,
    };

    this.clientMSChallenge.emit('assign-challenge-match', match);
  }

  @Delete('/:id')
  async deleteChallenge(@Param('id') id: string): Promise<void> {
    const challenge = await this.clientMSAdmin
      .send('get-challenges', id)
      .toPromise();
    if (!challenge) throw new BadRequestException(`Challenge not found`);

    this.clientMSChallenge.emit('delete-challenge', id);
  }
}
