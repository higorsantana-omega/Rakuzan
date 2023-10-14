import Player from '../../players/dtos/player.interface';
export declare class CreateChallengeDTO {
    dateTime: Date;
    requestBy: Player;
    category: string;
    players: Player[];
}
