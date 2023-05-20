import { Module } from '@nestjs/common';
import { ProxyRMQModule } from 'src/proxy/proxyrmq.module';
import { LocalStorageModule } from 'src/local-storage/local-storage.module';
import { PlayersController } from './players.controller';

@Module({
  imports: [ProxyRMQModule, LocalStorageModule],
  controllers: [PlayersController],
})
export class PlayersModule {}
