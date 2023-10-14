import { Match } from './interfaces/match.interface';
import { RmqContext } from '@nestjs/microservices';
import { MatchService } from './match.service';
export declare class MatchController {
    private matchService;
    private logger;
    constructor(matchService: MatchService);
    createMatch(match: Match, context: RmqContext): Promise<void>;
}
