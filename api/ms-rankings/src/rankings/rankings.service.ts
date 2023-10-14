import { Injectable, Logger } from '@nestjs/common';
import { Match, Ranking } from './interfaces/ranking.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RankingsService {
  private readonly logger = new Logger(RankingsService.name);

  constructor(@InjectModel('Ranking') private rankingModel: Model<Ranking>) {}

  async processMatch(processMatchDTO: { matchId: string; match: Match }) {
    this.logger.log(`${JSON.stringify(processMatchDTO)}`);

    const { match, matchId } = processMatchDTO;

    const rankingsPromises = match.players.map((player) => {
      const ranking = new this.rankingModel();

      ranking.category = match.category;
      ranking.challenge = match.challenge;
      ranking.match = matchId;
      ranking.player = player;

      const isWinner = player === match.def;
      const isLoser = player !== match.def;

      if (isWinner) {
        ranking.event = 'VICTORY';
        ranking.points = 30;
        ranking.operation = '+';
      }

      if (isLoser) {
        ranking.event = 'DEFEAT';
        ranking.points = 0;
        ranking.operation = '-';
      }

      this.logger.log(`ranking: ${JSON.stringify(ranking)}`);

      return ranking.save();
    });

    await Promise.all(rankingsPromises);
  }
}
