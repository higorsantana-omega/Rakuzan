import { Model } from 'mongoose';
import Player from './interfaces/player.interface';
export declare class PlayersService {
    private readonly playerModel;
    private logger;
    constructor(playerModel: Model<Player>);
    create(createPlayerDTO: Player): Promise<Player>;
    update(id: string, updatePlayerDTO: Player): Promise<void>;
    getAllPlayers(): Promise<Player[]>;
    getPlayerById(id: string): Promise<Player>;
    deletePlayer(id: string): Promise<void>;
}
