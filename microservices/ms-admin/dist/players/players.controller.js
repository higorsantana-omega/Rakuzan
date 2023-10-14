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
var PlayersController_1;
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersController = void 0;
const common_1 = require("@nestjs/common");
const players_service_1 = require("./players.service");
const microservices_1 = require("@nestjs/microservices");
const ackErrors = ['E1100'];
let PlayersController = PlayersController_1 = class PlayersController {
    constructor(playersService) {
        this.playersService = playersService;
        this.logger = new common_1.Logger(PlayersController_1.name);
    }
    async createPlayer(createPlayerDTO, context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        this.logger.log(`player: ${JSON.stringify(createPlayerDTO)}`);
        try {
            await this.playersService.create(createPlayerDTO);
            await channel.ack(originalMessage);
        }
        catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            const errors = ackErrors.filter((ack) => error.message.includes(ack));
            if (errors) {
                await channel.ack(originalMessage);
            }
        }
    }
    async updatePlayer(data, context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        try {
            this.logger.log(`data: ${JSON.stringify(data)}`);
            const player = data.player;
            await this.playersService.update(data.id, player);
            await channel.ack(originalMessage);
        }
        catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            const errors = ackErrors.filter((ack) => error.message.includes(ack));
            if (errors) {
                await channel.ack(originalMessage);
            }
        }
    }
    async getPlayers(_id, context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        try {
            if (_id) {
                return this.playersService.getPlayerById(_id);
            }
            return this.playersService.getAllPlayers();
        }
        finally {
            await channel.ack(originalMessage);
        }
    }
    async deletePlayer(_id, context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        try {
            await this.playersService.deletePlayer(_id);
            await channel.ack(originalMessage);
        }
        catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            const errors = ackErrors.filter((ack) => error.message.includes(ack));
            if (errors) {
                await channel.ack(originalMessage);
            }
        }
    }
};
__decorate([
    (0, microservices_1.EventPattern)('create-player'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "createPlayer", null);
__decorate([
    (0, microservices_1.EventPattern)('update-player'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "updatePlayer", null);
__decorate([
    (0, microservices_1.MessagePattern)('get-players'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "getPlayers", null);
__decorate([
    (0, microservices_1.EventPattern)('delete-player'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], PlayersController.prototype, "deletePlayer", null);
PlayersController = PlayersController_1 = __decorate([
    (0, common_1.Controller)('players'),
    __metadata("design:paramtypes", [players_service_1.PlayersService])
], PlayersController);
exports.PlayersController = PlayersController;
//# sourceMappingURL=players.controller.js.map