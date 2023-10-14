import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ClientProxyBasket {
  getClientProxyAdmin(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672/ranking'],
        queue: 'ms-admin',
      },
    });
  }

  getClientProxyChallenge(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672/ranking'],
        queue: 'ms-challenges',
      },
    });
  }

  getClientProxyRankings(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672/ranking'],
        queue: 'ms-rankings',
      },
    });
  }
}
