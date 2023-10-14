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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengesController = void 0;
const common_1 = require("@nestjs/common");
const client_proxy_1 = require("../proxy/client-proxy");
const create_challenge_dto_1 = require("./dtos/create-challenge.dto");
const challenge_status_validator_pipe_1 = require("../common/pipes/challenge-status-validator.pipe");
const update_challenge_dto_1 = require("./dtos/update-challenge.dto");
const assign_challenge_match_dto_1 = require("./dtos/assign-challenge-match.dto");
let ChallengesController = ChallengesController_1 = class ChallengesController {
    constructor(clientProxyBasket) {
        this.clientProxyBasket = clientProxyBasket;
        this.logger = new common_1.Logger(ChallengesController_1.name);
        this.clientMSChallenge = this.clientProxyBasket.getClientProxyChallenge();
        this.clientMSAdmin = this.clientProxyBasket.getClientProxyAdmin();
    }
    async createChallenge(createChallengeDTO) {
        var _a;
        await Promise.all(createChallengeDTO.players.map(async (player) => {
            const playerExists = await this.clientMSAdmin
                .send('get-players', player)
                .toPromise();
            if (!playerExists)
                throw new common_1.BadRequestException(`the player id ${player} not exists`);
        }));
        const requestIsPlayerOfTheMatch = createChallengeDTO.players.filter((player) => player._id === createChallengeDTO.requestBy);
        if (!requestIsPlayerOfTheMatch.length)
            throw new common_1.BadRequestException(`The request should be player of the match`);
        const categories = await this.clientMSAdmin
            .send('get-categories', createChallengeDTO.category)
            .toPromise();
        if (!categories)
            throw new common_1.BadRequestException(`The category not exists`);
        this.clientMSChallenge.emit('create-challenge', Object.assign(Object.assign({}, createChallengeDTO), { request: createChallengeDTO.requestBy, players: (_a = createChallengeDTO === null || createChallengeDTO === void 0 ? void 0 : createChallengeDTO.players) === null || _a === void 0 ? void 0 : _a.map((player) => player._id) }));
    }
    async getChallenge(_id) {
        if (_id) {
            const player = await this.clientMSAdmin
                .send('get-players', _id ? _id : '')
                .toPromise();
            if (!player)
                throw new common_1.BadRequestException(`Player not found.`);
        }
        return this.clientMSChallenge
            .send('get-challenges', _id ? { _id } : '')
            .toPromise();
    }
    async updateChallenge(updateChallengeDTO, _id) {
        const challenge = await this.clientMSChallenge
            .send('get-challenges', { _id })
            .toPromise();
        if (!challenge)
            throw new common_1.BadRequestException(`Challenge not found`);
        if (challenge.status !== 'PENDING') {
            throw new common_1.BadRequestException(`Challenge not be update because your status is not PENDING`);
        }
        this.clientMSChallenge.emit('update-challenge', {
            id: _id,
            challenge: updateChallengeDTO,
        });
    }
    async assignChallengeMatch(assignChallengeMatchDTO, _id) {
        const challenge = await this.clientMSChallenge
            .send('get-challenges', { _id })
            .toPromise();
        if (!challenge)
            throw new common_1.BadRequestException(`Challenge not found`);
        if (challenge.status === 'REALIZED')
            throw new common_1.BadRequestException(`Challenge already occurred`);
        if (challenge.status !== 'ACCEPTED')
            throw new common_1.BadRequestException(`Challenge not accepted`);
        if (!challenge.players.includes(assignChallengeMatchDTO.def))
            throw new common_1.BadRequestException(`The player winners not includes on match`);
        const match = {
            category: challenge.category,
            def: assignChallengeMatchDTO.def,
            challenge: _id,
            players: challenge.players,
            result: assignChallengeMatchDTO.result,
        };
        this.clientMSChallenge.emit('create-match', match);
    }
    async deleteChallenge(id) {
        const challenge = await this.clientMSChallenge
            .send('get-challenges', { _id: id })
            .toPromise();
        if (!challenge)
            throw new common_1.BadRequestException(`Challenge not found`);
        this.clientMSChallenge.emit('delete-challenge', id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_challenge_dto_1.CreateChallengeDTO]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "createChallenge", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "getChallenge", null);
__decorate([
    (0, common_1.Put)('/:challenge'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)(challenge_status_validator_pipe_1.ChallengeStatusValidatorPipe)),
    __param(1, (0, common_1.Param)('challenge')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_challenge_dto_1.UpdateChallengeDTO, String]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "updateChallenge", null);
__decorate([
    (0, common_1.Post)('/:challenge/match'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Param)('challenge')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assign_challenge_match_dto_1.AssignChallengeMatchDTO, String]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "assignChallengeMatch", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "deleteChallenge", null);
ChallengesController = ChallengesController_1 = __decorate([
    (0, common_1.Controller)('/api/challenges'),
    __metadata("design:paramtypes", [client_proxy_1.ClientProxyBasket])
], ChallengesController);
exports.ChallengesController = ChallengesController;
//# sourceMappingURL=challenges.controller.js.map