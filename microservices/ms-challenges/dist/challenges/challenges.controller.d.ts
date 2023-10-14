import { RmqContext } from '@nestjs/microservices';
import { ChallengesService } from './challenges.service';
import { Challenge } from './interfaces/challenges.interface';
export declare class ChallengesController {
    private readonly challengesService;
    private logger;
    constructor(challengesService: ChallengesService);
    createChallenge(challenge: Challenge, context: RmqContext): Promise<void>;
    updateChallenge(data: any, context: RmqContext): Promise<void>;
    deleteChallenge(id: string, context: RmqContext): Promise<void>;
    getChallenges(data: any, context: RmqContext): Promise<Challenge | Challenge[]>;
    getChallengesRealized(data: any, context: RmqContext): Promise<Challenge[]>;
    assignChallengeMatch(data: any, context: RmqContext): Promise<void>;
}
