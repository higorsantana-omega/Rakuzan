import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchSchema } from './schema/match.schema';
import { MatchController } from './match.controller';
import { ProxyRMQModule } from '../proxy/proxyrmq.module';
import { MatchService } from './match.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Match', schema: MatchSchema }]),
    ProxyRMQModule,
  ],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
