import { Controller, Logger } from '@nestjs/common';
import { Match } from './interfaces/match.interface';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { MatchService } from './match.service';

const ackErrors = ['E1100'];

@Controller()
export class MatchController {
  private logger = new Logger(MatchController.name);

  constructor(private matchService: MatchService) {}

  @EventPattern('create-match')
  async createMatch(@Payload() match: Match, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    this.logger.log(`match: ${JSON.stringify(match)}`);

    try {
      await this.matchService.create(match);

      await channel.ack(originalMessage);
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);

      const errors = ackErrors.filter((ack) => error.message.includes(ack));

      if (errors) {
        await channel.ack(originalMessage);
      }
    }
  }
}
