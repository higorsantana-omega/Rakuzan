import { Module } from '@nestjs/common';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesModule } from './categories/categories.module';
import { ProxyRMQModule } from './proxy/proxyrmq.module';
import { PlayersController } from './players/players.controller';

@Module({
  imports: [CategoriesModule, ProxyRMQModule],
  controllers: [CategoriesController, PlayersController],
  providers: [],
})
export class AppModule {}
