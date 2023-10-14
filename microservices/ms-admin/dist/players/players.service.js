"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PlayersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const microservices_1 = require("@nestjs/microservices");
let PlayersService = PlayersService_1 = class PlayersService {
    constructor(playerModel) {
        this.playerModel = playerModel;
        this.logger = new common_1.Logger(PlayersService_1.name);
    }
    async create(createPlayerDTO) {
        try {
            const { email } = createPlayerDTO;
            const player = await this.playerModel.findOne({ email }).exec();
            if (player) {
                throw new common_1.BadRequestException(`Player with email ${email} already exists.`);
            }
            const playerCreated = new this.playerModel(createPlayerDTO);
            return playerCreated.save();
        }
        catch (error) {
            this.logger.error(`error: ${error.message}`);
            throw new microservices_1.RpcException(error.message);
        }
    }
    async update(id, updatePlayerDTO) {
        try {
            const player = await this.playerModel.findOne({ _id: id }).exec();
            if (!player) {
                throw new common_1.BadRequestException(`Player with id ${id} not exists.`);
            }
            await this.playerModel
                .findOneAndUpdate({ _id: id }, { $set: updatePlayerDTO })
                .exec();
        }
        catch (error) {
            this.logger.error(`error: ${error.message}`);
            throw new microservices_1.RpcException(error.message);
        }
    }
    async getAllPlayers() {
        try {
            const players = await this.playerModel.find().exec();
            return players;
        }
        catch (error) {
            this.logger.error(`error: ${error.message}`);
            throw new microservices_1.RpcException(error.message);
        }
    }
    async getPlayerById(id) {
        try {
            const player = await this.playerModel.findOne({ _id: id }).exec();
            if (!player)
                throw new common_1.NotFoundException(`Player with id ${id} not found.`);
            return player;
        }
        catch (error) {
            this.logger.error(`error: ${error.message}`);
            throw new microservices_1.RpcException(error.message);
        }
    }
    async deletePlayer(id) {
        try {
            await this.playerModel.deleteOne({ _id: id });
        }
        catch (error) {
            this.logger.error(`error: ${error.message}`);
            throw new microservices_1.RpcException(error.message);
        }
    }
};
PlayersService = PlayersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Players')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PlayersService);
exports.PlayersService = PlayersService;
//# sourceMappingURL=players.service.js.map