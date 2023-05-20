import { Module } from '@nestjs/common';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesModule } from './categories/categories.module';
import { ProxyRMQModule } from './proxy/proxyrmq.module';

@Module({
  imports: [CategoriesModule, ProxyRMQModule],
  controllers: [CategoriesController],
  providers: [],
})
export class AppModule {}
