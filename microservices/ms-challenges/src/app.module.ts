import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengesModule } from './challenges/challenge.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL as string, {
      dbName: 'challenges',
    }),
    ChallengesModule,
    MatchModule,
  ],
})
export class AppModule {}
