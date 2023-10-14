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
var ChallengesController_1;
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengesController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const challenges_service_1 = require("./challenges.service");
const ackErrors = ['E1100'];
let ChallengesController = ChallengesController_1 = class ChallengesController {
    constructor(challengesService) {
        this.challengesService = challengesService;
        this.logger = new common_1.Logger(ChallengesController_1.name);
    }
    async createChallenge(challenge, context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        this.logger.log(`challenge: ${JSON.stringify(challenge)}`);
        try {
            await this.challengesService.create({
                dateTime: challenge.dateTime,
                players: challenge.players,
                request: challenge.request,
                category: challenge.category,
            });
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
    async updateChallenge(data, context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        this.logger.log(`data: ${JSON.stringify(data)}`);
        try {
            const challenge = data.challenge;
            await this.challengesService.update(data.id, challenge);
            await channel.ack(originalMessage);
        }
        catch (error) {
            const errors = ackErrors.filter((ack) => error.message.includes(ack));
            if (errors) {
                await channel.ack(originalMessage);
            }
        }
    }
    async deleteChallenge(id, context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        try {
            await this.challengesService.deleteChallenge(id);
            await channel.ack(originalMessage);
        }
        catch (error) {
            const errors = ackErrors.filter((ack) => error.message.includes(ack));
            if (errors) {
                await channel.ack(originalMessage);
            }
        }
    }
    async getChallenges(data, context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        try {
            const { _id, playerId } = data;
            if (_id) {
                return this.challengesService.getChallengesById(_id);
            }
            else if (playerId) {
                return this.challengesService.getChallengeByPlayerId(playerId);
            }
            else {
                return this.challengesService.getAllChallenges();
            }
        }
        finally {
            await channel.ack(originalMessage);
        }
    }
    async getChallengesRealized(data, context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        try {
            this.logger.log(`${data}`);
            return this.challengesService.getAllChallenges(data);
        }
        finally {
            await channel.ack(originalMessage);
        }
    }
    async assignChallengeMatch(data, context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        try {
            const { challenge, matchId } = data;
            await this.challengesService.assignChallengeMatch(challenge, matchId);
            await channel.ack(originalMessage);
        }
        catch (error) {
            const filterAckError = ackErrors.filter((ackError) => error.message.includes(ackError));
            if (filterAckError) {
                await channel.ack(originalMessage);
            }
        }
    }
};
__decorate([
    (0, microservices_1.EventPattern)('create-challenge'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "createChallenge", null);
__decorate([
    (0, microservices_1.EventPattern)('update-challenge'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "updateChallenge", null);
__decorate([
    (0, microservices_1.EventPattern)('delete-challenge'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "deleteChallenge", null);
__decorate([
    (0, microservices_1.EventPattern)('get-challenges'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_d = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "getChallenges", null);
__decorate([
    (0, microservices_1.EventPattern)('get-challenges-realized'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_e = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "getChallengesRealized", null);
__decorate([
    (0, microservices_1.EventPattern)('assign-challenge-match'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_f = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "assignChallengeMatch", null);
ChallengesController = ChallengesController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [challenges_service_1.ChallengesService])
], ChallengesController);
exports.ChallengesController = ChallengesController;
//# sourceMappingURL=challenges.controller.js.map