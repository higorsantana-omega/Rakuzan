import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import CreatePlayerDTO from './dtos/create-player.dto';
import Player from './interfaces/players.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class PlayersService {
  private players: Player[] = []

  private readonly logger = new Logger(PlayersService.name)

  async createOrUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    this.logger.log(`createPlayerDTO: ${createPlayerDTO}`)

    const { email } = createPlayerDTO

    const player = await this.players.find(player => player.email === email)
    if (player) {
      return this.update(player, createPlayerDTO)
    }

    this.create(createPlayerDTO)
  }

  async getAllPlayers(): Promise<Player[]> {
    const players = await this.players
    return players
  }

  async getPlayerByEmail(email: string): Promise<Player> {
    const player = await this.players.find(player => player.email === email)
    if (!player) throw new NotFoundException(`Player with e-mail ${email} not found.`)

    return player
  }

  async deletePlayer (email: string): Promise<void> {
    const player = await this.players.find(player => player.email === email) 
    if (!player) throw new NotFoundException(`Player with e-mail ${email} not found.`)

    this.players = this.players.filter(p => p.email !== email)
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

  private update(player: Player, createPlayerDTO: CreatePlayerDTO): void {
    const { name } = createPlayerDTO

    const updatedPlayer: Player = {
      ...player,
      name
    }

    const index = this.players.findIndex(p => p.email === player.email)
    this.players[index] = updatedPlayer
  }
}
