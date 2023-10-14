import { Document } from 'mongoose';
export type ChallengeStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'CANCELLED' | 'REALIZED';
export interface Challenge extends Document {
    dateTime: Date;
    dateRequest: Date;
    dateResponse: Date;
    status: ChallengeStatus;
    request: string;
    category: string;
    players: string[];
    match: string;
}
export interface Match extends Document {
    category: string;
    players: string[];
    def: string;
    result: Result[];
}
export interface Result {
    set: string;
}
