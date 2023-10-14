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
var RankingsController_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingsController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rankings_service_1 = require("./rankings.service");
const ackErrors = ['E1100'];
let RankingsController = RankingsController_1 = class RankingsController {
    constructor(rankingsService) {
        this.rankingsService = rankingsService;
        this.logger = new common_1.Logger(RankingsController_1.name);
    }
    async processMatch(data, context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        try {
            this.logger.log(`data: ${JSON.stringify(data)}`);
            const matchId = data.matchId;
            const match = data.match;
            await this.rankingsService.processMatch({ matchId, match });
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
    async getRankings(data, context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        try {
            const { categoryId, dateRef } = data;
            return this.rankingsService.getRankings(categoryId, dateRef);
        }
        finally {
            await channel.ack(originalMessage);
        }
    }
};
__decorate([
    (0, microservices_1.EventPattern)('process-match'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], RankingsController.prototype, "processMatch", null);
__decorate([
    (0, microservices_1.MessagePattern)('get-rankings'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], RankingsController.prototype, "getRankings", null);
RankingsController = RankingsController_1 = __decorate([
    (0, common_1.Controller)('rankings'),
    __metadata("design:paramtypes", [rankings_service_1.RankingsService])
], RankingsController);
exports.RankingsController = RankingsController;
//# sourceMappingURL=rankings.controller.js.map