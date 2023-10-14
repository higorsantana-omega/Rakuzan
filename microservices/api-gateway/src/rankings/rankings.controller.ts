import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ClientProxyBasket } from '../proxy/client-proxy';

@Controller('/api/rankings')
export class RankingsController {
  private clientMSRankings = this.clientProxyBasket.getClientProxyRankings();

  constructor(private clientProxyBasket: ClientProxyBasket) {}

  @Get()
  getRankigns(
    @Query('categoryId') categoryId: string,
    @Query('dateRef') dateRef: string,
  ) {
    if (!categoryId) {
      throw new BadRequestException('categoryId is required.');
    }

    return this.clientMSRankings.send('get-rankings', { categoryId, dateRef });
  }
}
