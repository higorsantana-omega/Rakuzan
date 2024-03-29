import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Match, RankingResult } from './interfaces/ranking.schema';
import { RankingsService } from './rankings.service';

const ackErrors = ['E1100'];

@Controller('rankings')
export class RankingsController {
  private logger = new Logger(RankingsController.name);

  constructor(private rankingsService: RankingsService) {}

  @EventPattern('process-match')
  async processMatch(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      this.logger.log(`data: ${JSON.stringify(data)}`);
      const matchId = data.matchId as string;
      const match = data.match as Match;

      await this.rankingsService.processMatch({ matchId, match });

      await channel.ack(originalMessage);
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);

      const errors = ackErrors.filter((ack) => error.message.includes(ack));

      if (errors) {
        await channel.ack(originalMessage);
      }
    }
  }

  @MessagePattern('get-rankings')
  async getRankings(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ): Promise<RankingResult[]> {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      const { categoryId, dateRef } = data;

      return this.rankingsService.getRankings(categoryId, dateRef);
    } finally {
      await channel.ack(originalMessage);
    }
  }
}
