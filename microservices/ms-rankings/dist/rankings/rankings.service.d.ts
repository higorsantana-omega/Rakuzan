import { Match, Ranking, RankingResult } from './interfaces/ranking.schema';
import { Model } from 'mongoose';
import { ClientProxyBasket } from 'src/proxyrmq/client-proxy';
export declare class RankingsService {
    private rankingModel;
    private clientProxyBasket;
    private readonly logger;
    private clientAdmin;
    private clientMSChallenges;
    constructor(rankingModel: Model<Ranking>, clientProxyBasket: ClientProxyBasket);
    processMatch(processMatchDTO: {
        matchId: string;
        match: Match;
    }): Promise<void>;
    getRankings(categoryId: string, dateRef: string): Promise<RankingResult[]>;
}
