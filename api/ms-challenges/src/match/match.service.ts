import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RpcException } from '@nestjs/microservices';
import { Match } from './interfaces/match.interface';
import { ClientProxyBasket } from '../proxy/client-proxy';

@Injectable()
export class MatchService {
  private readonly logger = new Logger(MatchService.name);
  private clientChallenges = this.clientProxyBasket.getClientProxyChallenge();

  constructor(
    @InjectModel('Match')
    private readonly matchModel: Model<Match>,
    private clientProxyBasket: ClientProxyBasket,
  ) {}

  async create(matchDTO: Match) {
    try {
      const match = new this.matchModel(matchDTO);
      this.logger.log(`match create: ${JSON.stringify(match)}`);

      const result = await match.save();
      const matchId = result._id;

      const challenge = await this.clientChallenges
        .send('get-challenges', { _id: match.challenge })
        .toPromise();

      return this.clientChallenges
        .emit('assign-challenge-match', {
          challenge: challenge,
          matchId: matchId,
        })
        .toPromise();
    } catch (error) {
      this.logger.error(`${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }
}
