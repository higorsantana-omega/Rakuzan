import { PlayersService } from './players.service';
import { RmqContext } from '@nestjs/microservices';
import Player from './interfaces/player.interface';
export declare class PlayersController {
    private readonly playersService;
    private logger;
    constructor(playersService: PlayersService);
    createPlayer(createPlayerDTO: Player, context: RmqContext): Promise<void>;
    updatePlayer(data: any, context: RmqContext): Promise<void>;
    getPlayers(_id: string, context: RmqContext): Promise<Player[] | Player>;
    deletePlayer(_id: string, context: RmqContext): Promise<void>;
}
