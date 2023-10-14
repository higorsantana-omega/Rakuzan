import { Injectable, Logger } from '@nestjs/common';
import { Category, Match, Ranking } from './interfaces/ranking.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import { ClientProxyBasket } from 'src/proxyrmq/client-proxy';

@Injectable()
export class RankingsService {
  private readonly logger = new Logger(RankingsService.name);
  private clientAdmin = this.clientProxyBasket.getClientProxyAdmin();

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
}
