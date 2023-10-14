import { Document } from 'mongoose';
export declare class Ranking extends Document {
    challenge: string;
    player: string;
    match: string;
    category: string;
    event: 'VICTORY' | 'DEFEAT';
    operation: '+' | '-';
    points: number;
}
export declare const RankingSchema: any;
export interface RankingResult {
    player?: string;
    position?: number;
    points?: number;
    matchHistory?: MatchHistory;
}
export interface MatchHistory {
    victory: number;
    defeat: number;
}
export interface Match extends Document {
    category: string;
    players: string[];
    def: string;
    result: Result[];
    challenge: string;
}
export interface Result {
    set: string;
}
export interface Event {
    name: 'VICTORY' | 'DEFEAT';
    operation: '+' | '-';
    value: number;
}
export interface Category {
    readonly _id: string;
    readonly category: string;
    description: string;
    events: Event[];
}
export type ChallengeStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'CANCELLED' | 'REALIZED';
export interface Challenge {
    _id: string;
    dateTime: Date;
    dateRequest: Date;
    dateResponse: Date;
    status: ChallengeStatus;
    request: string;
    category: string;
    players: string[];
    match: string;
}
