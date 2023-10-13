import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchSchema } from './schema/match.schema';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Match', schema: MatchSchema }]),
  ],
  providers: [MatchService],
  controllers: [MatchController],
})
export class MatchModule {}
