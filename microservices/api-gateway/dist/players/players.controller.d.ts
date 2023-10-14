import CreatePlayerDTO from './dtos/create-player.dto';
import UpdatePlayerDTO from './dtos/update-player.dto';
import { ClientProxyBasket } from 'src/proxy/client-proxy';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/local-storage/local-storage.service';
export declare class PlayersController {
    private clientProxyBasket;
    private localStorageService;
    private logger;
    private clientMSAdmin;
    constructor(clientProxyBasket: ClientProxyBasket, localStorageService: LocalStorageService);
    createPlayer(createPlayerDTO: CreatePlayerDTO): Promise<void>;
    getPlayers(_id: string): Observable<any>;
    updatePlayer(updatePlayerDTO: UpdatePlayerDTO, id: string): Promise<void>;
    deletePlayer(id: string): Promise<void>;
    uploadFiles(file: any, _id: string): Promise<void>;
}
