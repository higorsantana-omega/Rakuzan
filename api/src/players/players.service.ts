import { Injectable, Logger } from '@nestjs/common';
import CreatePlayerDTO from './dtos/create-player.dto';
import Player from './interfaces/players.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class PlayersService {
  private players: Player[] = []

  private readonly logger = new Logger(PlayersService.name)

  async createOrUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    this.logger.log(`createPlayerDTO: ${createPlayerDTO}`)

    this.create(createPlayerDTO)
  }

  private create(createPlayerDTO: CreatePlayerDTO): void {
    const { name, email, phone } = createPlayerDTO

    const player: Player = {
      id: randomUUID(),
      name,
      email,
      phone,
      photo: '',
      ranking: 'A',
      position: 1
    }

    this.players.push(player)
  }
}
