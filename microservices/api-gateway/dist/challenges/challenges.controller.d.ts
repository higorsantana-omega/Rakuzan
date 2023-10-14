import { ClientProxyBasket } from '../proxy/client-proxy';
import { CreateChallengeDTO } from './dtos/create-challenge.dto';
import { Observable } from 'rxjs';
import { UpdateChallengeDTO } from './dtos/update-challenge.dto';
import { AssignChallengeMatchDTO } from './dtos/assign-challenge-match.dto';
export declare class ChallengesController {
    private clientProxyBasket;
    private logger;
    private clientMSChallenge;
    private clientMSAdmin;
    constructor(clientProxyBasket: ClientProxyBasket);
    createChallenge(createChallengeDTO: CreateChallengeDTO): Promise<void>;
    getChallenge(_id: string): Promise<Observable<any>>;
    updateChallenge(updateChallengeDTO: UpdateChallengeDTO, _id: string): Promise<void>;
    assignChallengeMatch(assignChallengeMatchDTO: AssignChallengeMatchDTO, _id: string): Promise<void>;
    deleteChallenge(id: string): Promise<void>;
}
