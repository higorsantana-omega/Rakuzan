import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ChallengesService } from './challenges.service';
import { Challenge } from './interfaces/challenges.interface';

const ackErrors = ['E1100'];

@Controller()
export class ChallengesController {
  private logger = new Logger(ChallengesController.name);

  constructor(private readonly challengesService: ChallengesService) {}

  @EventPattern('create-challenge')
  async createChallenge(
    @Payload() challenge: Challenge,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    this.logger.log(`challenge: ${JSON.stringify(challenge)}`);

    try {
      await this.challengesService.create({
        dateTime: challenge.dateTime,
        players: challenge.players,
        request: challenge.request,
      });

      await channel.ack(originalMessage);
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);

      const errors = ackErrors.filter((ack) => error.message.includes(ack));

      if (errors) {
        await channel.ack(originalMessage);
      }
    }
  }

  @EventPattern('update-challenge')
  async updateChallenge(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    this.logger.log(`data: ${JSON.stringify(data)}`);

    try {
      const challenge: Challenge = data.challenge;

      await this.challengesService.update(data.id, challenge);

      await channel.ack(originalMessage);
    } catch (error) {
      const errors = ackErrors.filter((ack) => error.message.includes(ack));

      if (errors) {
        await channel.ack(originalMessage);
      }
    }
  }

  @EventPattern('delete-challenge')
  async deleteChallenge(@Payload() id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      await this.challengesService.deleteChallenge(id);

      await channel.ack(originalMessage);
    } catch (error) {
      const errors = ackErrors.filter((ack) => error.message.includes(ack));

      if (errors) {
        await channel.ack(originalMessage);
      }
    }
  }

  @MessagePattern('get-challenges')
  async getChallenges(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      const { _id, playerId } = data;

      if (_id) {
        return this.challengesService.getChallengesById(_id);
      } else if (playerId) {
        return this.challengesService.getChallengeByPlayerId(_id);
      } else {
        return this.challengesService.getAllChallenges();
      }
    } finally {
      await channel.ack(originalMessage);
    }
  }

  @EventPattern('assign-challenge-match')
  async assignChallengeMatch(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      const { challenge, matchId } = data;

      await this.challengesService.assignChallengeMatch(challenge, matchId);
      await channel.ack(originalMessage);
    } catch (error) {
      const filterAckError = ackErrors.filter((ackError) =>
        error.message.includes(ackError),
      );
      if (filterAckError) {
        await channel.ack(originalMessage);
      }
    }
  }
}
