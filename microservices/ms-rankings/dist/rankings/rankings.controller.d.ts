import { RmqContext } from '@nestjs/microservices';
import { RankingResult } from './interfaces/ranking.schema';
import { RankingsService } from './rankings.service';
export declare class RankingsController {
    private rankingsService;
    private logger;
    constructor(rankingsService: RankingsService);
    processMatch(data: any, context: RmqContext): Promise<void>;
    getRankings(data: any, context: RmqContext): Promise<RankingResult[]>;
}
