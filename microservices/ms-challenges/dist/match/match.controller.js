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
var MatchController_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const match_service_1 = require("./match.service");
const ackErrors = ['E1100'];
let MatchController = MatchController_1 = class MatchController {
    constructor(matchService) {
        this.matchService = matchService;
        this.logger = new common_1.Logger(MatchController_1.name);
    }
    async createMatch(match, context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        this.logger.log(`match: ${JSON.stringify(match)}`);
        try {
            await this.matchService.create(match);
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
    (0, microservices_1.EventPattern)('create-match'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "createMatch", null);
MatchController = MatchController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [match_service_1.MatchService])
], MatchController);
exports.MatchController = MatchController;
//# sourceMappingURL=match.controller.js.map