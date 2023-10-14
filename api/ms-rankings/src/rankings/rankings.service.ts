import { Injectable, Logger } from '@nestjs/common';
import {
  Category,
  Challenge,
  Match,
  Ranking,
  RankingResult,
} from './interfaces/ranking.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import { ClientProxyBasket } from 'src/proxyrmq/client-proxy';
import moment from 'moment-timezone';
import * as lodash from 'lodash';

@Injectable()
export class RankingsService {
  private readonly logger = new Logger(RankingsService.name);

  private clientAdmin = this.clientProxyBasket.getClientProxyAdmin();
  private clientMSChallenges = this.clientProxyBasket.getClientProxyChallenge();

  constructor(
    @InjectModel('Ranking') private rankingModel: Model<Ranking>,
    private clientProxyBasket: ClientProxyBasket,
  ) {}

  async processMatch(processMatchDTO: { matchId: string; match: Match }) {
    this.logger.log(`${JSON.stringify(processMatchDTO)}`);

    const { match, matchId } = processMatchDTO;

    try {
      const category: Category = await this.clientAdmin
        .send('get-categories', match.category)
        .toPromise();

      const rankingsPromises = match.players.map((player) => {
        const ranking = new this.rankingModel();

        ranking.category = match.category;
        ranking.challenge = match.challenge;
        ranking.match = matchId;
        ranking.player = player;

        const isWinner = player === match.def;
        const isLoser = player !== match.def;

        if (isWinner) {
          const [victoryEvents] = category.events.filter(
            (event) => event.name === 'VICTORY',
          );

          ranking.event = 'VICTORY';
          ranking.operation = victoryEvents.operation;
          ranking.points = victoryEvents.value;
        }

        if (isLoser) {
          const [defeatEvents] = category.events.filter(
            (event) => event.name === 'DEFEAT',
          );

          ranking.event = 'DEFEAT';
          ranking.operation = defeatEvents.operation;
          ranking.points = defeatEvents.value;
        }

        this.logger.log(`ranking: ${JSON.stringify(ranking)}`);

        return ranking.save();
      });

      await Promise.all(rankingsPromises);
    } catch (error) {
      this.logger.error(error);
      throw new RpcException(error.message);
    }
  }

  async getRankings(
    categoryId: string,
    dateRef: string,
  ): Promise<RankingResult[]> {
    try {
      this.logger.log(`categoryId: ${categoryId} dataRef: ${dateRef}`);

      const registerRankings = await this.rankingModel
        .find()
        .where('category')
        .equals(categoryId)
        .exec();
      this.logger.log(`registerRankings: ${registerRankings}`);

      const challenges: Challenge[] = await this.clientMSChallenges
        .send('get-challenges-realized', { categoryId, dateRef })
        .toPromise();

      lodash.remove(registerRankings, (item) => {
        return (
          challenges.filter(
            (challenge) => challenge._id === item.challenge.toString(),
          ).length === 0
        );
      });

      this.logger.log(`newRanking: ${registerRankings}`);

      const result = lodash(registerRankings)
        .groupBy('player')
        .map((items, key) => ({
          player: key,
          matchHistory: lodash.countBy(items, 'event'),
          points: lodash.sumBy(items, 'points'),
        }))
        .value();

      const resultSorted = lodash.orderBy(result, 'points', 'desc');

      const rankingResult: RankingResult[] = resultSorted.map((item, i) => {
        const ranking: RankingResult = {
          player: item.player,
          position: i + 1,
          points: item.points,
          matchHistory: {
            victory: item.matchHistory.VICTORY ?? 0,
            defeat: item.matchHistory.DEFEAT ?? 0,
          },
        };

        return ranking;
      });

      return rankingResult;
    } catch (error) {
      this.logger.error(`error ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }
}
