/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { Challenge } from './interfaces/challenges.interface';
import { CreateChallengeDTO } from './dtos/create-challenge.dto';
import { UpdateChallengeDTO } from './dtos/update-challenge.dto';
export declare class ChallengesService {
    private readonly challengeModel;
    private readonly logger;
    constructor(challengeModel: Model<Challenge>);
    create(createChallengeDTO: CreateChallengeDTO): Promise<import("mongoose").Document<unknown, {}, Challenge> & Challenge & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(_id: string, updateChallengeDTO: UpdateChallengeDTO): Promise<void>;
    deleteChallenge(_id: string): Promise<void>;
    getAllChallenges(params?: {
        categoryId?: string;
        dateRef?: string;
    }): Promise<Challenge[]>;
    getChallengesById(_id: string): Promise<Challenge>;
    getChallengeByPlayerId(_id: string): Promise<Challenge[]>;
    assignChallengeMatch(_id: string, matchId: string): Promise<void>;
}
