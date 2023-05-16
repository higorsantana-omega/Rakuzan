import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateChallengeDTO } from './dtos/create-challenge.dto';
import { ChallengesService } from './challenges.service';
import { Challenge } from './interfaces/challenges.interface';
import { ChallengeStatusValidatorPipe } from './pipes/challenge-status-validator.pipe';
import { UpdateChallengeDTO } from './dtos/update-challenge.dto';
import { AssignChallengeMatchDTO } from './dtos/assign-challenge-match.dto';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createChallenge(@Body() createChallengeDTO: CreateChallengeDTO) {
    return this.challengesService.create(createChallengeDTO);
  }

  @Get()
  async getChallenge(@Query('playerId') _id: string): Promise<Challenge[]> {
    return _id
      ? this.challengesService.getChallengeByPlayerId(_id)
      : this.challengesService.getAllChallenges();
  }

  @Put('/:challenge')
  @UsePipes(ValidationPipe)
  async updateChallenge(
    @Body(ChallengeStatusValidatorPipe) updateChallengeDTO: UpdateChallengeDTO,
    @Param('challenge') _id: string,
  ) {
    await this.challengesService.update(_id, updateChallengeDTO);
  }

  @Post('/:challenge/match')
  async assignChallengeMatch(
    @Body(ValidationPipe) assignChallengeMatchDTO: AssignChallengeMatchDTO,
    @Param('challenge') _id: string,
  ): Promise<void> {
    return this.challengesService.assignChallengeMatch(
      _id,
      assignChallengeMatchDTO,
    );
  }

  @Delete('/:id')
  async deleteChallenge(@Param('id') id: string): Promise<void> {
    return this.challengesService.deleteChallenge(id);
  }
}
