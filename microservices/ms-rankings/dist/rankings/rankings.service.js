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
var RankingsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const microservices_1 = require("@nestjs/microservices");
const client_proxy_1 = require("src/proxyrmq/client-proxy");
const lodash = require("lodash");
let RankingsService = RankingsService_1 = class RankingsService {
    constructor(rankingModel, clientProxyBasket) {
        this.rankingModel = rankingModel;
        this.clientProxyBasket = clientProxyBasket;
        this.logger = new common_1.Logger(RankingsService_1.name);
        this.clientAdmin = this.clientProxyBasket.getClientProxyAdmin();
        this.clientMSChallenges = this.clientProxyBasket.getClientProxyChallenge();
    }
    async processMatch(processMatchDTO) {
        this.logger.log(`${JSON.stringify(processMatchDTO)}`);
        const { match, matchId } = processMatchDTO;
        try {
            const category = await this.clientAdmin
                .send('get-categories', match.category)
                .toPromise();
            const rankingsPromises = match.players.map((player) => {
                const ranking = new this.rankingModel();
                ranking.category = match.category;
                ranking.challenge = match.challenge;
                ranking.match = matchId;
                ranking.player = player;
                const isWinner = player === match.def;
                const isLoser = player !== match.def;
                if (isWinner) {
                    const [victoryEvents] = category.events.filter((event) => event.name === 'VICTORY');
                    ranking.event = 'VICTORY';
                    ranking.operation = victoryEvents.operation;
                    ranking.points = victoryEvents.value;
                }
                if (isLoser) {
                    const [defeatEvents] = category.events.filter((event) => event.name === 'DEFEAT');
                    ranking.event = 'DEFEAT';
                    ranking.operation = defeatEvents.operation;
                    ranking.points = defeatEvents.value;
                }
                this.logger.log(`ranking: ${JSON.stringify(ranking)}`);
                return ranking.save();
            });
            await Promise.all(rankingsPromises);
        }
        catch (error) {
            this.logger.error(error);
            throw new microservices_1.RpcException(error.message);
        }
    }
    async getRankings(categoryId, dateRef) {
        try {
            this.logger.log(`categoryId: ${categoryId} dataRef: ${dateRef}`);
            const registerRankings = await this.rankingModel
                .find()
                .where('category')
                .equals(categoryId)
                .exec();
            this.logger.log(`registerRankings: ${registerRankings}`);
            const challenges = await this.clientMSChallenges
                .send('get-challenges-realized', { categoryId, dateRef })
                .toPromise();
            lodash.remove(registerRankings, (item) => {
                return (challenges.filter((challenge) => challenge._id === item.challenge.toString()).length === 0);
            });
            this.logger.log(`newRanking: ${registerRankings}`);
            const result = lodash(registerRankings)
                .groupBy('player')
                .map((items, key) => ({
                player: key,
                matchHistory: lodash.countBy(items, 'event'),
                points: lodash.sumBy(items, 'points'),
            }))
                .value();
            const resultSorted = lodash.orderBy(result, 'points', 'desc');
            const rankingResult = resultSorted.map((item, i) => {
                var _a, _b;
                const ranking = {
                    player: item.player,
                    position: i + 1,
                    points: item.points,
                    matchHistory: {
                        victory: (_a = item.matchHistory.VICTORY) !== null && _a !== void 0 ? _a : 0,
                        defeat: (_b = item.matchHistory.DEFEAT) !== null && _b !== void 0 ? _b : 0,
                    },
                };
                return ranking;
            });
            return rankingResult;
        }
        catch (error) {
            this.logger.error(`error ${JSON.stringify(error.message)}`);
            throw new microservices_1.RpcException(error.message);
        }
    }
};
RankingsService = RankingsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Ranking')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        client_proxy_1.ClientProxyBasket])
], RankingsService);
exports.RankingsService = RankingsService;
//# sourceMappingURL=rankings.service.js.map