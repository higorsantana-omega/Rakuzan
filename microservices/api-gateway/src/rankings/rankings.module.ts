import { Module } from '@nestjs/common';
import { RankingsController } from './rankings.controller';
import { ProxyRMQModule } from '../proxy/proxyrmq.module';

@Module({
  imports: [ProxyRMQModule],
  controllers: [RankingsController],
})
export class RankingsModule {}
