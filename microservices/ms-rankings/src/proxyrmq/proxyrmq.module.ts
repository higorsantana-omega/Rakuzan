import { Module } from '@nestjs/common';
import { ClientProxyBasket } from './client-proxy';

@Module({
  providers: [ClientProxyBasket],
  exports: [ClientProxyBasket],
})
export class ProxyRMQModule {}
