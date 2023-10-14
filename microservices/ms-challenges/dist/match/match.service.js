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
var MatchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const microservices_1 = require("@nestjs/microservices");
const client_proxy_1 = require("../proxy/client-proxy");
let MatchService = MatchService_1 = class MatchService {
    constructor(matchModel, clientProxyBasket) {
        this.matchModel = matchModel;
        this.clientProxyBasket = clientProxyBasket;
        this.logger = new common_1.Logger(MatchService_1.name);
        this.clientChallenges = this.clientProxyBasket.getClientProxyChallenge();
        this.clientRankings = this.clientProxyBasket.getClientProxyRankings();
    }
    async create(matchDTO) {
        try {
            const match = new this.matchModel(matchDTO);
            this.logger.log(`match create: ${JSON.stringify(match)}`);
            const result = await match.save();
            const matchId = result._id;
            const challenge = await this.clientChallenges
                .send('get-challenges', { _id: match.challenge })
                .toPromise();
            await this.clientChallenges
                .emit('assign-challenge-match', {
                challenge: challenge,
                matchId: matchId,
            })
                .toPromise();
            return this.clientRankings
                .emit('process-match', {
                matchId,
                match,
            })
                .toPromise();
        }
        catch (error) {
            this.logger.error(`${JSON.stringify(error.message)}`);
            throw new microservices_1.RpcException(error.message);
        }
    }
};
MatchService = MatchService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Match')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        client_proxy_1.ClientProxyBasket])
], MatchService);
exports.MatchService = MatchService;
//# sourceMappingURL=match.service.js.map