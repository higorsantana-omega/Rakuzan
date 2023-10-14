import { ClientProxyBasket } from '../proxy/client-proxy';
export declare class RankingsController {
    private clientProxyBasket;
    private clientMSRankings;
    constructor(clientProxyBasket: ClientProxyBasket);
    getRankigns(categoryId: string, dateRef: string): any;
}
