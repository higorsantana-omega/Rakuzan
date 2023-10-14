import { Model } from 'mongoose';
import { Match } from './interfaces/match.interface';
import { ClientProxyBasket } from '../proxy/client-proxy';
export declare class MatchService {
    private readonly matchModel;
    private clientProxyBasket;
    private readonly logger;
    private clientChallenges;
    private clientRankings;
    constructor(matchModel: Model<Match>, clientProxyBasket: ClientProxyBasket);
    create(matchDTO: Match): Promise<any>;
}
