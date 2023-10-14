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
var ChallengesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const microservices_1 = require("@nestjs/microservices");
let ChallengesService = ChallengesService_1 = class ChallengesService {
    constructor(challengeModel) {
        this.challengeModel = challengeModel;
        this.logger = new common_1.Logger(ChallengesService_1.name);
    }
    async create(createChallengeDTO) {
        try {
            const challenge = new this.challengeModel(createChallengeDTO);
            challenge.category = createChallengeDTO.category;
            challenge.dateRequest = new Date();
            challenge.status = 'PENDING';
            return challenge.save();
        }
        catch (error) {
            this.logger.error(`${JSON.stringify(error.message)}`);
            throw new microservices_1.RpcException(error.message);
        }
    }
    async update(_id, updateChallengeDTO) {
        try {
            const challenge = await this.challengeModel.findOne({ _id }).exec();
            if (!challenge) {
                throw new common_1.BadRequestException(`challenge with id ${_id} not exists.`);
            }
            const challengeUpdated = Object.assign({}, updateChallengeDTO);
            if (updateChallengeDTO.status) {
                challengeUpdated.dateResponse = new Date();
            }
            await this.challengeModel
                .findOneAndUpdate({ _id }, { $set: challengeUpdated })
                .exec();
        }
        catch (error) {
            this.logger.error(`${JSON.stringify(error.message)}`);
            throw new microservices_1.RpcException(error.message);
        }
    }
    async deleteChallenge(_id) {
        try {
            const challenge = await this.challengeModel.findById(_id).exec();
            if (!challenge)
                throw new common_1.BadRequestException(`Challenge with id ${_id} not registered!`);
            challenge.status = 'CANCELLED';
            await this.challengeModel
                .findOneAndUpdate({ _id }, { $set: challenge })
                .exec();
        }
        catch (error) {
            this.logger.error(`${JSON.stringify(error.message)}`);
            throw new microservices_1.RpcException(error.message);
        }
    }
    async getAllChallenges(params) {
        const { categoryId, dateRef } = params;
        try {
            if (!categoryId && !dateRef) {
                const categories = await this.challengeModel.find().exec();
                return categories;
            }
            const query = this.challengeModel.find();
            if (categoryId) {
                query.where('category').equals(categoryId);
            }
            if (dateRef) {
                const date = new Date(`${dateRef}T23:59:59.999Z`);
                const dateUnix = date.getTime();
                query.where('dateRequest').lte(dateUnix);
            }
            query.where('status').equals('REALIZED');
            const challenges = await query.exec();
            return challenges;
        }
        catch (error) {
            this.logger.error(`${JSON.stringify(error.message)}`);
            throw new microservices_1.RpcException(error.message);
        }
    }
    async getChallengesById(_id) {
        try {
            const category = await this.challengeModel.findOne({ _id }).exec();
            return category;
        }
        catch (error) {
            this.logger.error(`${JSON.stringify(error.message)}`);
            throw new microservices_1.RpcException(error.message);
        }
    }
    async getChallengeByPlayerId(_id) {
        try {
            return this.challengeModel
                .find({})
                .where('players')
                .in(_id)
                .exec();
        }
        catch (error) {
            this.logger.error(`${JSON.stringify(error.message)}`);
            throw new microservices_1.RpcException(error.message);
        }
    }
    async assignChallengeMatch(_id, matchId) {
        try {
            const challenge = await this.challengeModel.findById(_id).exec();
            if (!challenge)
                throw new common_1.NotFoundException(`challenge with id ${_id} not found.`);
            challenge.status = 'REALIZED';
            challenge.match = matchId;
            await this.challengeModel
                .findOneAndUpdate({ _id }, { $set: challenge })
                .exec();
        }
        catch (error) {
            this.logger.error(`${JSON.stringify(error.message)}`);
            throw new microservices_1.RpcException(error.message);
        }
    }
};
ChallengesService = ChallengesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Challenge')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ChallengesService);
exports.ChallengesService = ChallengesService;
//# sourceMappingURL=challenges.service.js.map